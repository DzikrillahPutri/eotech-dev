import { TicketSchema } from '#database/schema'
import { beforeCreate, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Order from './order.ts'
import TicketType from './ticket_type.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Ticket extends TicketSchema {
    public static primaryKey = 'ticket_id'
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare ticket_id: string

    @column()
    declare qrcode: string

    @column()
    declare status_ticket: 'flash_sale' | 'reguler' | 'vip'

    @column.dateTime()
    declare checkin_at: DateTime | null

    @column()
    declare order_id: string

    @column()
    declare ticket_type_id: string

    @belongsTo(() => Order, {
        foreignKey: 'order_id',
    })
    declare order: BelongsTo<typeof Order>

    @belongsTo(() => TicketType, {
        foreignKey: 'ticket_type_id',
    })
    declare ticketType: BelongsTo<typeof TicketType>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @beforeCreate()
    static assignUuid(ticket: Ticket) {
        if (!ticket.ticket_id) {
            ticket.ticket_id = uuidv4()
        }
    }


}