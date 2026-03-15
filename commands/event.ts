import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Event extends BaseCommand {
  static commandName = 'event'
  static description = 'event command test flow'

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Running event command test flow...')
    this.logger.info('Simulating: GET /api/v1/events -> 200')
    this.logger.info('Simulating: POST /api/v1/events -> 200')
    this.logger.info('Simulating: GET /api/v1/events/:id -> 200')
    this.logger.info('Simulating: DELETE /api/v1/events/:id -> 200')
  }
}
