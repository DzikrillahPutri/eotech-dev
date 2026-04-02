/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  login: typeof routes['login']
  session: {
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  public: {
    events: {
      index: typeof routes['public.events.index']
    }
  }
  api: {
    events: {
      index: typeof routes['api.events.index']
      showBySlug: typeof routes['api.events.showBySlug']
    }
  }
  events: {
    store: typeof routes['events.store']
    show: typeof routes['events.show']
    update: typeof routes['events.update']
    destroy: typeof routes['events.destroy']
  }
  admin: {
    dashboard: typeof routes['admin.dashboard']
    events: typeof routes['admin.events'] & {
      create: typeof routes['admin.events.create']
    }
    reports: typeof routes['admin.reports']
    tickets: {
      quota: typeof routes['admin.tickets.quota'] & {
        create: typeof routes['admin.tickets.quota.create']
      }
    }
    partners: typeof routes['admin.partners']
  }
}
