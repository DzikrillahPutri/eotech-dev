import { EventSchema } from '#database/schema'
import { beforeCreate, belongsTo, column} from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import User from './user.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Event extends EventSchema {
    static primaryKey = 'event_id'

    @column({ isPrimary:true })
    declare event_id : string

    @column()
    declare title: string

    @column()
    declare description: string | null

    @column()
    declare location: string

    @column()
    declare organizer_contact: string

    @column()
    declare registrationEndAt: DateTime<boolean>

    @column()
    declare registrationStartAt: DateTime<boolean>

    @column()
    declare banner: string | null

    @column()
    declare status: 'pending' | 'publish' | 'archived'

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime<boolean> | null

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime<boolean> | null

    @beforeCreate()
    static assignUuid(event: Event) {
        if (!event.event_id) {
            event.event_id = uuidv4()
        }
    }

    @column()
    declare owner_id: string

    @belongsTo(() => User, { foreignKey: 'owner_id' })
    declare owner: BelongsTo<typeof User>

}
