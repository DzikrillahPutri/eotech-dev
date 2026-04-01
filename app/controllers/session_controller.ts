import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    // PERBAIKAN: Arahkan langsung ke halaman Kelola Event
    // Nama 'admin.events' sesuai dengan yang kita tulis di routes.ts tadi
    return response.redirect().toRoute('admin.events')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }
}