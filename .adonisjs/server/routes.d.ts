import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'events.store': { paramsTuple?: []; params?: {} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_members.invite': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'event_members.revoke': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'memberId': ParamValue} }
    'event_members.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'event_members.accept_invite': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'ticket_types.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'ticket_types.store': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'ticket_types.update': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'id': ParamValue} }
    'ticket_types.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'id': ParamValue} }
    'orders.store': { paramsTuple?: []; params?: {} }
    'orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.tickets': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.check_status': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
    'payments.webhook': { paramsTuple?: []; params?: {} }
    'tickets.checkin': { paramsTuple?: []; params?: {} }
    'tickets.checkin_history': { paramsTuple?: []; params?: {} }
    'dashboard.summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_participants': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_transactions': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_checkins': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.partner_summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.events': { paramsTuple?: []; params?: {} }
    'admin.events.create': { paramsTuple?: []; params?: {} }
    'admin.reports': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota.create': { paramsTuple?: []; params?: {} }
    'admin.partners': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_members.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'event_members.accept_invite': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'ticket_types.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.tickets': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.check_status': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
    'tickets.checkin_history': { paramsTuple?: []; params?: {} }
    'dashboard.summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_participants': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_transactions': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_checkins': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.partner_summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.events': { paramsTuple?: []; params?: {} }
    'admin.events.create': { paramsTuple?: []; params?: {} }
    'admin.reports': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota.create': { paramsTuple?: []; params?: {} }
    'admin.partners': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_members.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'event_members.accept_invite': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'ticket_types.index': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.tickets': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.check_status': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
    'tickets.checkin_history': { paramsTuple?: []; params?: {} }
    'dashboard.summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_participants': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_transactions': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.export_checkins': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'dashboard.partner_summary': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.events': { paramsTuple?: []; params?: {} }
    'admin.events.create': { paramsTuple?: []; params?: {} }
    'admin.reports': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota': { paramsTuple?: []; params?: {} }
    'admin.tickets.quota.create': { paramsTuple?: []; params?: {} }
    'admin.partners': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'events.store': { paramsTuple?: []; params?: {} }
    'event_members.invite': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'ticket_types.store': { paramsTuple: [ParamValue]; params: {'eventId': ParamValue} }
    'orders.store': { paramsTuple?: []; params?: {} }
    'payments.webhook': { paramsTuple?: []; params?: {} }
    'tickets.checkin': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ticket_types.update': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'id': ParamValue} }
  }
  PATCH: {
    'events.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'events.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_members.revoke': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'memberId': ParamValue} }
    'ticket_types.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'eventId': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}