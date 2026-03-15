/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

const api = 'api/v1'

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())


// Event API routes (no middleware)
router.group(() => {
  router.get(`${api}/events`, 'EventsController.index')
  router.post(`${api}/events`, 'EventsController.store')
  router.get(`${api}/events/:id`, 'EventsController.show')
  router.delete(`${api}/events/:id`, 'EventsController.destroy')
})
