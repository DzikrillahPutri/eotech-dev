import Ticket from "#models/ticket"
import Event from "#models/event"

export class TicketService {
  // Your code here
  private ticketModel: typeof Ticket
  private eventModel: typeof Event


  constructor() {
    // Initialize any dependencies or configurations if needed
    this.ticketModel = Ticket
    this.eventModel = Event
  }

  toJSON(ticket: Ticket) {
    // Logic to convert ticket data to JSON format
    return {
      // Example ticket data
      ticket_id: ticket.ticket_id,
      qrcode: ticket.qrcode,
      status_ticket: ticket.status_ticket,
      checkin_at: ticket.checkin_at,
      order_id: ticket.order_id,
      ticket_type_id: ticket.ticket_type_id,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }
  }

  // helper to query event context
  async getEventData(eventId: string){
    const eventsData = await this.eventModel.findByOrFail('event_id', eventId)

    if (!eventsData) {
      this._ticketServiceLogCodeTrace('Event not found')
      throw new Error('Event not found')
    }
    return eventsData
  }
  
  async createTicket(orderId: string, ticketTypeId: string) {
    // Logic to create a ticket based on the order ID and ticket type ID
    // Get input data from event data
    try
    {
      const eventData = await this.getEventData(orderId)
      if (!eventData) {
        this._ticketServiceLogCodeTrace('Event not found')
        throw new Error('Event not found')
      }
      

      // Create a new ticket using the ticket model
      const newTicket = await this.ticketModel.create({
        qrcode: this._generateQRCode(),
        status_ticket: 'reguler',
        checkin_at: null,
        order_id: orderId,
        ticket_type_id: ticketTypeId,
      })

      if(newTicket) {
        this._ticketServiceLogCodeTrace('Ticket created successfully', 'success')
      } else {
        this._ticketServiceLogCodeTrace('Failed to create ticket')
        throw new Error('Failed to create ticket')
      }

    
      return newTicket
    }
    catch(error)    {
      this._ticketServiceLogCodeTrace('Failed to fetch event data' + error.message)
      throw new Error('Failed to fetch event data')
    }
  }

  
  async getTicketById(ticketId: string) {
    // Logic to retrieve a ticket by its ID
  }

  async updateTicketStatus(ticketId: string, status: string) {
    // Logic to update the status of a ticket
  }

  async deleteTicket(ticketId: string) {
    // Logic to delete a ticket by its ID
  }

  private _generateQRCode(): string {
    // Implement your QR code generation logic here
    // This is just a placeholder implementation

    return `QR-${Math.random().toString(36).substr(2, 9)}`
  }

  private _ticketServiceLogCodeTrace(message: string, status: 'error' | 'success' = 'error') {
    // Implement your logging logic here, e.g., using a logging library or custom logger

    const configCondition = [
      'error',
      'success'
    ]
    const codeTrace = '[TicketService]- ' + Math.random().toString(36).substr(2, 9)

    if (status === configCondition[0]) {
      console.error(`${codeTrace} - ${message}`)
    } else {
      console.log(`${codeTrace} - ${message}`)
    }
  }

    
}