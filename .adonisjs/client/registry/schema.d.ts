/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
  'events.index': {
    methods: ["GET","HEAD"]
    pattern: '//api/v1/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.show_by_slug': {
    methods: ["GET","HEAD"]
    pattern: '//api/v1/events/slug/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.store': {
    methods: ["POST"]
    pattern: '/api/v1/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.update': {
    methods: ["PUT"]
    pattern: '/api/v1/events/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.update_status': {
    methods: ["PATCH"]
    pattern: '/api/v1/events/:id/status'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'events.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/events/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'event_members.invite': {
    methods: ["POST"]
    pattern: '/api/v1/events/:eventId/members/invite'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'event_members.revoke': {
    methods: ["DELETE"]
    pattern: '/api/v1/events/:eventId/members/:memberId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { eventId: ParamValue; memberId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'event_members.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/members'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'event_members.accept_invite': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invitations/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'ticket_types.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/ticket-types'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'ticket_types.store': {
    methods: ["POST"]
    pattern: '/api/v1/events/:eventId/ticket-types'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'ticket_types.update': {
    methods: ["PUT"]
    pattern: '/api/v1/events/:eventId/ticket-types/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { eventId: ParamValue; id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'ticket_types.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/events/:eventId/ticket-types/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { eventId: ParamValue; id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'orders.store': {
    methods: ["POST"]
    pattern: '/api/v1/orders'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'orders.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/orders/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'orders.tickets': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/orders/:id/tickets'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tickets.check_status': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tickets/:ticketId/status'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { ticketId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'payments.webhook': {
    methods: ["POST"]
    pattern: '/api/v1/payments/webhook'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tickets.checkin': {
    methods: ["POST"]
    pattern: '/api/v1/checkin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tickets.checkin_history': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/checkin/history'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.summary': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/dashboard'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.export_participants': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/reports/participants'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.export_transactions': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/reports/transactions'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.export_checkins': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/reports/checkins'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.partner_summary': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:eventId/dashboard/summary'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { eventId: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
