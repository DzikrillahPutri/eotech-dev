import { PaymentSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'


export default class Payment extends PaymentSchema {
    public static primaryKey = 'payment_id'
    public static selfAssignPrimaryKey = true

    
    @column({ isPrimary: true })
    declare payment_id: string

    @column()
    declare paymen_methods: 'qris' | 'transfer' | 'va'

    @column()
    declare payment_status: 'pending' | 'approved' | 'reject'

    @column()
    declare payment_expired_at: Date

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime<boolean> 

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime<boolean>

    static assignUuid(payment: Payment) {
        if (!payment.payment_id) {
            payment.payment_id = uuidv4()
        }
    }

}