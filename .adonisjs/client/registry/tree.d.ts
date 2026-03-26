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
    showBySlug: typeof routes['events.show_by_slug']
    store: typeof routes['events.store']
    show: typeof routes['events.show']
    update: typeof routes['events.update']
    updateStatus: typeof routes['events.update_status']
    destroy: typeof routes['events.destroy']
  }
  eventMembers: {
    invite: typeof routes['event_members.invite']
    revoke: typeof routes['event_members.revoke']
    index: typeof routes['event_members.index']
    acceptInvite: typeof routes['event_members.accept_invite']
  }
  ticketTypes: {
    index: typeof routes['ticket_types.index']
    store: typeof routes['ticket_types.store']
    update: typeof routes['ticket_types.update']
    destroy: typeof routes['ticket_types.destroy']
  }
  orders: {
    store: typeof routes['orders.store']
    show: typeof routes['orders.show']
    tickets: typeof routes['orders.tickets']
  }
  tickets: {
    checkStatus: typeof routes['tickets.check_status']
    checkin: typeof routes['tickets.checkin']
    checkinHistory: typeof routes['tickets.checkin_history']
  }
  payments: {
    webhook: typeof routes['payments.webhook']
  }
  dashboard: {
    summary: typeof routes['dashboard.summary']
    exportParticipants: typeof routes['dashboard.export_participants']
    exportTransactions: typeof routes['dashboard.export_transactions']
    exportCheckins: typeof routes['dashboard.export_checkins']
    partnerSummary: typeof routes['dashboard.partner_summary']
  }
}
