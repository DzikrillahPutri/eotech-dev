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
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
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
    pattern: '/api/events',
    tokens: [{"old":"/api/events","type":0,"val":"api","end":""},{"old":"/api/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.index']['types'],
  },
  'events.store': {
    methods: ["POST"],
    pattern: '/api/events',
    tokens: [{"old":"/api/events","type":0,"val":"api","end":""},{"old":"/api/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.store']['types'],
  },
  'events.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/events/:id',
    tokens: [{"old":"/api/events/:id","type":0,"val":"api","end":""},{"old":"/api/events/:id","type":0,"val":"events","end":""},{"old":"/api/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.show']['types'],
  },
  'events.destroy': {
    methods: ["DELETE"],
    pattern: '/api/events/:id',
    tokens: [{"old":"/api/events/:id","type":0,"val":"api","end":""},{"old":"/api/events/:id","type":0,"val":"events","end":""},{"old":"/api/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.destroy']['types'],
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
