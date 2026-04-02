import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

    //dashboard controller untuk menampilkan dashboard setelah login
    public async index({ inertia }: HttpContext) {
        return inertia.render('admin/dashboard', {})
    }

    public async events({ inertia }: HttpContext) {
        return inertia.render('admin/events/index', {})
    }


}