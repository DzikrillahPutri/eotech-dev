/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'events.index': {
    methods: ["GET","HEAD"],
    pattern: '//api/v1/events',
    tokens: [{"old":"//api/v1/events","type":0,"val":"","end":""},{"old":"//api/v1/events","type":0,"val":"api","end":""},{"old":"//api/v1/events","type":0,"val":"v1","end":""},{"old":"//api/v1/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.index']['types'],
  },
  'events.show_by_slug': {
    methods: ["GET","HEAD"],
    pattern: '//api/v1/events/slug/:slug',
    tokens: [{"old":"//api/v1/events/slug/:slug","type":0,"val":"","end":""},{"old":"//api/v1/events/slug/:slug","type":0,"val":"api","end":""},{"old":"//api/v1/events/slug/:slug","type":0,"val":"v1","end":""},{"old":"//api/v1/events/slug/:slug","type":0,"val":"events","end":""},{"old":"//api/v1/events/slug/:slug","type":0,"val":"slug","end":""},{"old":"//api/v1/events/slug/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['events.show_by_slug']['types'],
  },
  'events.store': {
    methods: ["POST"],
    pattern: '/api/v1/events',
    tokens: [{"old":"/api/v1/events","type":0,"val":"api","end":""},{"old":"/api/v1/events","type":0,"val":"v1","end":""},{"old":"/api/v1/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.store']['types'],
  },
  'events.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.show']['types'],
  },
  'events.update': {
    methods: ["PUT"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.update']['types'],
  },
  'events.update_status': {
    methods: ["PATCH"],
    pattern: '/api/v1/events/:id/status',
    tokens: [{"old":"/api/v1/events/:id/status","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id/status","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id/status","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id/status","type":1,"val":"id","end":""},{"old":"/api/v1/events/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['events.update_status']['types'],
  },
  'events.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.destroy']['types'],
  },
  'event_members.invite': {
    methods: ["POST"],
    pattern: '/api/v1/events/:eventId/members/invite',
    tokens: [{"old":"/api/v1/events/:eventId/members/invite","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/members/invite","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/members/invite","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/members/invite","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/members/invite","type":0,"val":"members","end":""},{"old":"/api/v1/events/:eventId/members/invite","type":0,"val":"invite","end":""}],
    types: placeholder as Registry['event_members.invite']['types'],
  },
  'event_members.revoke': {
    methods: ["DELETE"],
    pattern: '/api/v1/events/:eventId/members/:memberId',
    tokens: [{"old":"/api/v1/events/:eventId/members/:memberId","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/members/:memberId","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/members/:memberId","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/members/:memberId","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/members/:memberId","type":0,"val":"members","end":""},{"old":"/api/v1/events/:eventId/members/:memberId","type":1,"val":"memberId","end":""}],
    types: placeholder as Registry['event_members.revoke']['types'],
  },
  'event_members.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/members',
    tokens: [{"old":"/api/v1/events/:eventId/members","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/members","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/members","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/members","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/members","type":0,"val":"members","end":""}],
    types: placeholder as Registry['event_members.index']['types'],
  },
  'event_members.accept_invite': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invitations/:token',
    tokens: [{"old":"/api/v1/invitations/:token","type":0,"val":"api","end":""},{"old":"/api/v1/invitations/:token","type":0,"val":"v1","end":""},{"old":"/api/v1/invitations/:token","type":0,"val":"invitations","end":""},{"old":"/api/v1/invitations/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['event_members.accept_invite']['types'],
  },
  'ticket_types.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/ticket-types',
    tokens: [{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"ticket-types","end":""}],
    types: placeholder as Registry['ticket_types.index']['types'],
  },
  'ticket_types.store': {
    methods: ["POST"],
    pattern: '/api/v1/events/:eventId/ticket-types',
    tokens: [{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/ticket-types","type":0,"val":"ticket-types","end":""}],
    types: placeholder as Registry['ticket_types.store']['types'],
  },
  'ticket_types.update': {
    methods: ["PUT"],
    pattern: '/api/v1/events/:eventId/ticket-types/:id',
    tokens: [{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"ticket-types","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ticket_types.update']['types'],
  },
  'ticket_types.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/events/:eventId/ticket-types/:id',
    tokens: [{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":0,"val":"ticket-types","end":""},{"old":"/api/v1/events/:eventId/ticket-types/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ticket_types.destroy']['types'],
  },
  'orders.store': {
    methods: ["POST"],
    pattern: '/api/v1/orders',
    tokens: [{"old":"/api/v1/orders","type":0,"val":"api","end":""},{"old":"/api/v1/orders","type":0,"val":"v1","end":""},{"old":"/api/v1/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['orders.store']['types'],
  },
  'orders.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/orders/:id',
    tokens: [{"old":"/api/v1/orders/:id","type":0,"val":"api","end":""},{"old":"/api/v1/orders/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/orders/:id","type":0,"val":"orders","end":""},{"old":"/api/v1/orders/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['orders.show']['types'],
  },
  'orders.tickets': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/orders/:id/tickets',
    tokens: [{"old":"/api/v1/orders/:id/tickets","type":0,"val":"api","end":""},{"old":"/api/v1/orders/:id/tickets","type":0,"val":"v1","end":""},{"old":"/api/v1/orders/:id/tickets","type":0,"val":"orders","end":""},{"old":"/api/v1/orders/:id/tickets","type":1,"val":"id","end":""},{"old":"/api/v1/orders/:id/tickets","type":0,"val":"tickets","end":""}],
    types: placeholder as Registry['orders.tickets']['types'],
  },
  'tickets.check_status': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tickets/:ticketId/status',
    tokens: [{"old":"/api/v1/tickets/:ticketId/status","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/:ticketId/status","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/:ticketId/status","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/:ticketId/status","type":1,"val":"ticketId","end":""},{"old":"/api/v1/tickets/:ticketId/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['tickets.check_status']['types'],
  },
  'payments.webhook': {
    methods: ["POST"],
    pattern: '/api/v1/payments/webhook',
    tokens: [{"old":"/api/v1/payments/webhook","type":0,"val":"api","end":""},{"old":"/api/v1/payments/webhook","type":0,"val":"v1","end":""},{"old":"/api/v1/payments/webhook","type":0,"val":"payments","end":""},{"old":"/api/v1/payments/webhook","type":0,"val":"webhook","end":""}],
    types: placeholder as Registry['payments.webhook']['types'],
  },
  'tickets.checkin': {
    methods: ["POST"],
    pattern: '/api/v1/checkin',
    tokens: [{"old":"/api/v1/checkin","type":0,"val":"api","end":""},{"old":"/api/v1/checkin","type":0,"val":"v1","end":""},{"old":"/api/v1/checkin","type":0,"val":"checkin","end":""}],
    types: placeholder as Registry['tickets.checkin']['types'],
  },
  'tickets.checkin_history': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/checkin/history',
    tokens: [{"old":"/api/v1/checkin/history","type":0,"val":"api","end":""},{"old":"/api/v1/checkin/history","type":0,"val":"v1","end":""},{"old":"/api/v1/checkin/history","type":0,"val":"checkin","end":""},{"old":"/api/v1/checkin/history","type":0,"val":"history","end":""}],
    types: placeholder as Registry['tickets.checkin_history']['types'],
  },
  'dashboard.summary': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/dashboard',
    tokens: [{"old":"/api/v1/events/:eventId/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/dashboard","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/dashboard","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.summary']['types'],
  },
  'dashboard.export_participants': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/reports/participants',
    tokens: [{"old":"/api/v1/events/:eventId/reports/participants","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/reports/participants","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/reports/participants","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/reports/participants","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/reports/participants","type":0,"val":"reports","end":""},{"old":"/api/v1/events/:eventId/reports/participants","type":0,"val":"participants","end":""}],
    types: placeholder as Registry['dashboard.export_participants']['types'],
  },
  'dashboard.export_transactions': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/reports/transactions',
    tokens: [{"old":"/api/v1/events/:eventId/reports/transactions","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/reports/transactions","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/reports/transactions","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/reports/transactions","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/reports/transactions","type":0,"val":"reports","end":""},{"old":"/api/v1/events/:eventId/reports/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['dashboard.export_transactions']['types'],
  },
  'dashboard.export_checkins': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/reports/checkins',
    tokens: [{"old":"/api/v1/events/:eventId/reports/checkins","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/reports/checkins","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/reports/checkins","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/reports/checkins","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/reports/checkins","type":0,"val":"reports","end":""},{"old":"/api/v1/events/:eventId/reports/checkins","type":0,"val":"checkins","end":""}],
    types: placeholder as Registry['dashboard.export_checkins']['types'],
  },
  'dashboard.partner_summary': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:eventId/dashboard/summary',
    tokens: [{"old":"/api/v1/events/:eventId/dashboard/summary","type":0,"val":"api","end":""},{"old":"/api/v1/events/:eventId/dashboard/summary","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:eventId/dashboard/summary","type":0,"val":"events","end":""},{"old":"/api/v1/events/:eventId/dashboard/summary","type":1,"val":"eventId","end":""},{"old":"/api/v1/events/:eventId/dashboard/summary","type":0,"val":"dashboard","end":""},{"old":"/api/v1/events/:eventId/dashboard/summary","type":0,"val":"summary","end":""}],
    types: placeholder as Registry['dashboard.partner_summary']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dashboard',
    tokens: [{"old":"/admin/dashboard","type":0,"val":"admin","end":""},{"old":"/admin/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin.events': {
    methods: ["GET","HEAD"],
    pattern: '/admin/events',
    tokens: [{"old":"/admin/events","type":0,"val":"admin","end":""},{"old":"/admin/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['admin.events']['types'],
  },
  'admin.events.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/events/create',
    tokens: [{"old":"/admin/events/create","type":0,"val":"admin","end":""},{"old":"/admin/events/create","type":0,"val":"events","end":""},{"old":"/admin/events/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.events.create']['types'],
  },
  'admin.reports': {
    methods: ["GET","HEAD"],
    pattern: '/admin/reports',
    tokens: [{"old":"/admin/reports","type":0,"val":"admin","end":""},{"old":"/admin/reports","type":0,"val":"reports","end":""}],
    types: placeholder as Registry['admin.reports']['types'],
  },
  'admin.tickets.quota': {
    methods: ["GET","HEAD"],
    pattern: '/admin/tickets/quota',
    tokens: [{"old":"/admin/tickets/quota","type":0,"val":"admin","end":""},{"old":"/admin/tickets/quota","type":0,"val":"tickets","end":""},{"old":"/admin/tickets/quota","type":0,"val":"quota","end":""}],
    types: placeholder as Registry['admin.tickets.quota']['types'],
  },
  'admin.tickets.quota.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/tickets/quota/create',
    tokens: [{"old":"/admin/tickets/quota/create","type":0,"val":"admin","end":""},{"old":"/admin/tickets/quota/create","type":0,"val":"tickets","end":""},{"old":"/admin/tickets/quota/create","type":0,"val":"quota","end":""},{"old":"/admin/tickets/quota/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.tickets.quota.create']['types'],
  },
  'admin.partners': {
    methods: ["GET","HEAD"],
    pattern: '/admin/partners',
    tokens: [{"old":"/admin/partners","type":0,"val":"admin","end":""},{"old":"/admin/partners","type":0,"val":"partners","end":""}],
    types: placeholder as Registry['admin.partners']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
