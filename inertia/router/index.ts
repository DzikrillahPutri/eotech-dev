import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

/**
 * Route guard for checking authentication and authorization
 */
const requireAuth = (to: any, from: any, next: any) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated.value) {
    next()
  } else {
    next('/login')
  }
}

/**
 * Route guard for checking specific roles
 */
const requireRole = (roles: string[]) => {
  return (to: any, from: any, next: any) => {
    const { hasRole, isAuthenticated } = useAuth()

    if (!isAuthenticated.value) {
      next('/login')
    } else if (hasRole(roles as any)) {
      next()
    } else {
      next('/403')
    }
  }
}

/**
 * Route guard for checking minimum role
 */
const requireMinRole = (minRole: string) => {
  return (to: any, from: any, next: any) => {
    const { hasMinRole, isAuthenticated } = useAuth()

    if (!isAuthenticated.value) {
      next('/login')
    } else if (hasMinRole(minRole as any)) {
      next()
    } else {
      next('/403')
    }
  }
}

// Public pages (no auth required)
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/auth/signup.vue'),
    meta: { requiresGuest: true },
  },
]

// Super Admin Routes
const superAdminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import('@/pages/admin/dashboards/SuperAdminDashboard.vue'),
    beforeEnter: requireRole(['super_admin']),
    meta: { title: 'Dashboard Admin' },
  },
  {
    path: '/admin/users',
    name: 'admin.users',
    component: () => import('@/pages/admin/users/UserManagement.vue'),
    beforeEnter: requireRole(['super_admin']),
    meta: { title: 'Manajemen Pengguna' },
  },
  {
    path: '/admin/system',
    name: 'admin.system',
    component: () => import('@/pages/admin/system/SystemSettings.vue'),
    beforeEnter: requireRole(['super_admin']),
    meta: { title: 'Pengaturan Sistem' },
  },
]

// Event Organizer Admin Routes
const eventOrganizerRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/events',
    name: 'admin.events',
    component: () => import('@/pages/admin/events/EventList.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Kelola Event' },
  },
  {
    path: '/admin/events/create',
    name: 'admin.events.create',
    component: () => import('@/pages/admin/events/CreateEvent.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Buat Event Baru' },
  },
  {
    path: '/admin/events/:id/edit',
    name: 'admin.events.edit',
    component: () => import('@/pages/admin/events/EditEvent.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Edit Event' },
  },
  {
    path: '/admin/events/:id/tickets',
    name: 'admin.events.tickets',
    component: () => import('@/pages/admin/events/TicketTypeManagement.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Manajemen Kuota Tiket' },
  },
  {
    path: '/admin/events/:id/partners',
    name: 'admin.events.partners',
    component: () => import('@/pages/admin/events/PartnerManagement.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Kelola Partner' },
  },
  {
    path: '/admin/reports',
    name: 'admin.reports',
    component: () => import('@/pages/admin/reports/SalesReports.vue'),
    beforeEnter: requireRole(['event_organizer_admin', 'super_admin']),
    meta: { title: 'Laporan Penjualan' },
  },
]

// Volunteer Organizer Routes
const volunteerRoutes: RouteRecordRaw[] = [
  {
    path: '/volunteer/dashboard',
    name: 'volunteer.dashboard',
    component: () => import('@/pages/volunteer/VolunteerDashboard.vue'),
    beforeEnter: requireRole(['volunteer_organizer']),
    meta: { title: 'Dashboard Volunteer' },
  },
  {
    path: '/volunteer/checkin',
    name: 'volunteer.checkin',
    component: () => import('@/pages/volunteer/CheckinPage.vue'),
    beforeEnter: requireRole(['volunteer_organizer']),
    meta: { title: 'Check-in Peserta' },
  },
  {
    path: '/volunteer/reports',
    name: 'volunteer.reports',
    component: () => import('@/pages/volunteer/CheckinReports.vue'),
    beforeEnter: requireRole(['volunteer_organizer']),
    meta: { title: 'Laporan Check-in' },
  },
]

// Participant Routes
const participantRoutes: RouteRecordRaw[] = [
  {
    path: '/participant/dashboard',
    name: 'participant.dashboard',
    component: () => import('@/pages/participant/ParticipantDashboard.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Dashboard Peserta' },
  },
  {
    path: '/participant/events',
    name: 'participant.events',
    component: () => import('@/pages/participant/BrowseEvents.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Jelajahi Event' },
  },
  {
    path: '/participant/orders',
    name: 'participant.orders',
    component: () => import('@/pages/participant/MyOrders.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Pesanan Saya' },
  },
  {
    path: '/participant/tickets',
    name: 'participant.tickets',
    component: () => import('@/pages/participant/MyTickets.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Tiket Saya' },
  },
  {
    path: '/participant/profile',
    name: 'participant.profile',
    component: () => import('@/pages/participant/Profile.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Profil Saya' },
  },
]

// Error routes
const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/pages/errors/Forbidden.vue'),
    meta: { title: 'Akses Ditolak' },
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/pages/errors/NotFound.vue'),
    meta: { title: 'Halaman Tidak Ditemukan' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

// Combine all routes
const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...superAdminRoutes,
  ...eventOrganizerRoutes,
  ...volunteerRoutes,
  ...participantRoutes,
  ...errorRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Global route guard for auth state initialization
 */
router.beforeEach((to, from, next) => {
  const { initAuth, isAuthenticated } = useAuth()

  // Initialize auth from storage on first load
  if (!isAuthenticated.value) {
    initAuth()
  }

  // Update page title
  document.title = (to.meta.title as string) || 'Eotech Tiket'

  next()
})

export default router
