import { OrderSchema } from '#database/schema'
import { beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Event from './event.ts'
import Payment from './payment.ts'
import { DateTime } from 'luxon'

export default class Order extends OrderSchema {
    public static primaryKey = 'order_id'
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare order_id: string
    
    @column()
    declare buyer_name: string

    @column()
    declare buyer_email: string

    @column()
    declare buyer_phone: string

    @column()
    declare total_amount: number

    @hasMany(() => Event, {
        foreignKey: 'event_id',
    })
    declare event_id: HasMany<typeof Event>

    @hasMany(() => Payment, {
        foreignKey: 'payment_id',
    })
    declare payment_id: HasMany<typeof Payment>

    @beforeCreate()
    static assignUuid(order: Order) {
        if (!order.order_id) {
            order.order_id = crypto.randomUUID()
        }
    }

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime<boolean> | null

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime<boolean> | null


}