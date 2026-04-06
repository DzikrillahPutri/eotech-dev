import Event from "#models/event"

export class EventService {
  private eventModel: typeof Event

  constructor() {
    this.eventModel = Event
  }
  
  toJSON(event: Event) {
    return {
        event_id: event.event_id, // Atur sesuai nama property di Model kamu (misal: event.id atau event.eventId)
        title: event.title,
        description: event.description,
        location: event.location,
        organizer_contact: event.organizerContact, // <-- Ditambahkan
        registration_start_at: event.registrationStartAt,
        registration_end_at: event.registrationEndAt,
        banner: event.banner,
        status: event.status,
        slug: event.slug,
        created_at: event.createdAt, // <-- Diperbaiki menjadi snake_case
        updated_at: event.updatedAt, // <-- Diperbaiki menjadi snake_case
        owner_id: event.ownerId      // <-- Ditambahkan
    }
  }

  async getEventDataPublic(url_params: { page: number, limit: number, status: 'pending' | 'publish' | 'archived' }) {
    const { page, limit, status } = url_params
    
    // Validasi parameter
    if (page < 1 || limit < 1 || !['pending', 'publish', 'archived'].includes(status)) {
      throw new Error('Invalid request parameters')
    }
    
    try {
      // Menggunakan .paginate() dari Lucid ORM menggantikan .offset() dan .limit()
      // Pagination otomatis membuat struktur meta yang persis seperti kontrak API
      const paginatedEvents = await this.eventModel.query()
        .where('status', status)
        .orderBy('created_at', 'desc')
        .paginate(page, limit)
        
      // Setup trace code logs
      const traceCode = this._traceServiceCode()

      // Return sesuai struktur API response contract
      return {
        message_id: traceCode,
        message: "success",
        data: {
          meta: paginatedEvents.getMeta(), // Menghasilkan total, perPage, currentPage, dll
          data: paginatedEvents.all().map(event => this.toJSON(event))
        }
      }

    } catch (error) {
      throw new Error('Error fetching event data')
    }
  }

  async createEvent(eventData: Partial<Event>) {
    // ... [kode tetap sama]
  }

  private _traceServiceCode() {
    // ... [kode tetap sama]
  }
}