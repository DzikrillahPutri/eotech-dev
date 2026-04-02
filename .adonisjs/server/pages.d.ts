import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'admin/dashboard': ExtractProps<(typeof import('../../inertia/pages/admin/dashboard.vue'))['default']>
    'admin/events/create': ExtractProps<(typeof import('../../inertia/pages/admin/events/create.vue'))['default']>
    'admin/events/index': ExtractProps<(typeof import('../../inertia/pages/admin/events/index.vue'))['default']>
    'admin/partners/index': ExtractProps<(typeof import('../../inertia/pages/admin/partners/index.vue'))['default']>
    'admin/reports/index': ExtractProps<(typeof import('../../inertia/pages/admin/reports/index.vue'))['default']>
    'admin/tickets/create_quota': ExtractProps<(typeof import('../../inertia/pages/admin/tickets/create_quota.vue'))['default']>
    'admin/tickets/quota': ExtractProps<(typeof import('../../inertia/pages/admin/tickets/quota.vue'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'events/show': ExtractProps<(typeof import('../../inertia/pages/events/show.vue'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.vue'))['default']>
  }
}
