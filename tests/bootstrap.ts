import { assert } from '@japa/assert'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import { browserClient } from '@japa/browser-client'
import { authBrowserClient } from '@adonisjs/auth/plugins/browser_client'
import { sessionBrowserClient } from '@adonisjs/session/plugins/browser_client'

export const plugins: Config['plugins'] = [
  assert(),
  pluginAdonisJS(app),

  /**
   * Configures Playwright and creates a fresh browser
   * context before every test.
   */
  browserClient({ runInSuites: ['browser'] }),

  /**
   * Allows reading and writing session data
   * via the browser context.
   */
  sessionBrowserClient(app),

  /**
   * Enables the loginAs method for authenticating
   * users during tests.
   */
  authBrowserClient(app),
]

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}