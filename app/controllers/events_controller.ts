import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Event from '#models/event'

export default class EventsController {
  /**
   * Display a list of resource
   */
  async index({ request, response, logger}: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    logger.info('Fetch event data' )

    const dataEvent = await db.from('event').paginate(page,limit)

    if(!dataEvent){
      return response.json({
        message: 'Failed, data is empty!'
      })
    }


    return response.json({
      message: 'succes',
      title: 'data event',
      data: [
        dataEvent
      ]
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { title, description, location, registration_end_at, registration_start_at, organizer_contact } = request.only([
      'title', 
      'description',
      'location',
      'registration_start_at',
      'registration_end_at',
      'organizer_contact'
    ])

    if(!title && !description){
      return response.json({
        message: 'Title and Description empty, please fill mandatory field',
      })
    }

    const [id] = await db.insertQuery().table('events').insert({
      title,
      description,
      location,
      organizer_contact,
      registration_end_at,
      registration_start_at,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    })

    return response.json({
      id
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response, logger }: HttpContext) {
    const id = params.id()
    const findId = await 
    db.from('events')
    .select('event_id')
    .where('event_id', id)

    if(!id && !findId){
      return response.json({
        message: 'id not found, please check again'
      })
    }

    logger.info(`Query data from id ${id}`)
    const payload = await db.from('events')
    .select('*')
    .where('event_id', id)

    return response.json({
      message: 'success',
      data: [{
        payload
      }]
    })
  }

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response, logger }: HttpContext) {
    const id = params.id()
    const findId = await  db.from('events')
    .select('event_id')
    .where('event_id', id)

    if(!id && !findId){
      return response.json({
        message: 'Id not found!!'
      })
    }

    logger.info( `Deleted events with id : $(id)`)

    const payload = await Event.findOrFail(id)
    await payload.delete()

    return response.json({
      message: 'Event Success deleted',
      data: {
        event_id: id
      }
    })
  }
}