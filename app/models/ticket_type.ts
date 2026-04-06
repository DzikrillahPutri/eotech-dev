import { TicketTypeSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Event from './event.ts'


export default class TicketType extends TicketTypeSchema {
    public static primaryKey = 'ticket_type_id'
    public static selfAssignPrimaryKey = true
    
    @column({ isPrimary: true })
    declare ticket_type_id: string

    @column()
    declare ticket_name: string

    @column()
    declare price: number

    @column()
    declare quota: number

    @column()
    declare sales_start_date: DateTime<boolean>
    
    @column()
    declare sales_end_date: DateTime<boolean>

    @column()
    declare per_order_limit: number

    @column()
    declare description: string

    @belongsTo(() => Event, {
        foreignKey: 'event_id',
    })
    declare event_id: BelongsTo<typeof Event>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime<boolean> | null

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime<boolean> | null

     static assignUuid(ticketType: TicketType) {
        if (!ticketType.ticket_type_id) {
            ticketType.ticket_type_id = crypto.randomUUID()
        }
    }


    
}