import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Admin Utama',
      email: 'admin@eotechtiket.com',
      password: 'password123',
      // Pastikan kolom 'role' ada di migrasi database kamu
      // Jika error di baris ini, hapus saja baris role-nya dulu
    })
  }
}