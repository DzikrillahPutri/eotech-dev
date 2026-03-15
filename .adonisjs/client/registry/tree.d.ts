/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  events: {
    index: typeof routes['events.index']
    store: typeof routes['events.store']
    show: typeof routes['events.show']
    destroy: typeof routes['events.destroy']
  }
}
