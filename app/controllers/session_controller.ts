import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'

export default class SessionController {
  /**
   * Generate a unique trace message ID per request
   */
  private generateMessageId(): string {
    return `LOGIN-${Date.now()}-${randomUUID().split('-')[0].toUpperCase()}`
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response, logger, session }: HttpContext) {
    const messageId = this.generateMessageId()
    const { email, password } = request.all()

    // ── Trace: request received ───────────────────────────────────────────────
    logger.info(
      {
        messageId,
        email,
        ip: request.ip(),
        userAgent: request.header('user-agent'),
      },
      '[LOGIN] Login attempt started'
    )

    // ── Guard: missing fields ─────────────────────────────────────────────────
    if (!email || !password) {
      logger.warn({ messageId, email, hasPassword: !!password }, '[LOGIN] Missing email or password')
      return response.status(422).json({
        message: 'Validation failed',
        errors: {
          email: !email ? ['Email wajib diisi.'] : [],
          password: !password ? ['Kata sandi wajib diisi.'] : [],
        },
      })
    }
    

    try {
      // ── Step 1: Verify credentials ──────────────────────────────────────────
      logger.info({ messageId, email }, '[LOGIN] Verifying credentials via User.verifyCredentials')
      const user = await User.verifyCredentials(email, password)

      logger.info(
        { messageId, user_id: user.user_id, role: user.role, email: user.email },
        '[LOGIN] Credentials verified'
      )

      // ── Step 2: Authenticate session ────────────────────────────────────────
      logger.info({ messageId, user_id: user.user_id }, '[LOGIN] Creating web session')
      await auth.use('web').login(user)

      logger.info(
        {
          messageId,
          user_id: user.user_id,
          isAuthenticated: auth.isAuthenticated,
          sessionId: session.sessionId,
        },
        '[LOGIN] Session created successfully'
      )

      // ── Step 3: Redirect ────────────────────────────────────────────────────
      logger.info({ messageId, user_id: user.user_id }, '[LOGIN] Redirecting to admin.dashboard')
      return response.redirect().toRoute('admin.dashboard')

    } catch (error: any) {
      // ── Classify error for better trace ──────────────────────────────────────
      const isCredentialError = error.code === 'E_INVALID_CREDENTIALS'

      logger.error(
        {
          messageId,
          email,
          errorCode: error.code ?? 'UNKNOWN',
          errorMessage: error.message,
          // Only include stack for non-credential errors (unexpected failures)
          ...(isCredentialError ? {} : { stack: error.stack }),
        },
        isCredentialError
          ? '[LOGIN] Invalid credentials — wrong email or password'
          : '[LOGIN] Unexpected error during login'
      )

      // ── Always return the same generic message (prevent email enumeration) ──
      return response.status(400).json({
        message: 'Login gagal. Pastikan email dan kata sandi benar.',
      })
    }
  }

  async destroy({ auth, response, logger, session }: HttpContext) {
    const messageId = `LOGOUT-${Date.now()}-${randomUUID().split('-')[0].toUpperCase()}`

    try {
      const user_id = auth.user?.user_id
      const sessionId = session.sessionId

      logger.info({ messageId, user_id, sessionId }, '[LOGOUT] Logout attempt started')
      await auth.use('web').logout()
      logger.info({ messageId, user_id, sessionId }, '[LOGOUT] Session destroyed successfully')

      return response.redirect().toRoute('login')

    } catch (error: any) {
      logger.error(
        { messageId, errorMessage: error.message, stack: error.stack },
        '[LOGOUT] Unexpected error during logout'
      )
      // Redirect anyway — don't leave user stuck on a broken page
      return response.redirect().toRoute('login')
    }
  }
}