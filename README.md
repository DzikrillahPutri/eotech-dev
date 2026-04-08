# Eotech - Event Management System

A modern, scalable event management system built with AdonisJS, Vue 3, and Inertia.js.

## 🚀 Features

### Core Functionality
- **Event CRUD Operations**: Complete Create, Read, Update, Delete operations for events
- **File Upload Support**: Banner image upload with validation and storage
- **User Authentication**: Secure authentication system with role-based access
- **Real-time Updates**: Live event status updates and notifications

### Performance & Security
- **API Rate Limiting**: Configurable rate limits to prevent abuse
- **Response Caching**: Intelligent caching for improved performance
- **File Upload Validation**: Secure file upload with type and size validation
- **Input Validation**: Comprehensive data validation with detailed error messages

### Developer Experience
- **TypeScript**: Full TypeScript support for type safety
- **Comprehensive Testing**: Unit and integration tests
- **API Documentation**: Well-documented REST API endpoints
- **Modular Architecture**: Clean, maintainable code structure

## 🏗️ Architecture

### Service Layer
- **EventService**: Core business logic for event operations
- **FileUploadService**: Handles file upload, validation, and storage
- **RateLimitService**: Manages API rate limiting
- **CacheService**: Provides caching functionality

### API Endpoints

#### Public Endpoints
```
GET  /events              # List published events
GET  /events/slug/:slug   # Get event by slug
```

#### Protected Endpoints (Authentication Required)
```
GET    /api/v1/events           # List user's events
GET    /api/v1/events/stats     # Get event statistics
POST   /api/v1/events           # Create new event
GET    /api/v1/events/:id       # Get specific event
PUT    /api/v1/events/:id       # Update event
DELETE /api/v1/events/:id       # Delete/archive event
```

## 📁 Project Structure

```
├── app/
│   ├── controllers/
│   │   └── events_controller.ts    # Event API endpoints
│   ├── models/
│   │   └── event.ts                # Event model
│   ├── services/
│   │   ├── event_service.ts        # Core event business logic
│   │   ├── file_upload_service.ts  # File upload handling
│   │   ├── rate_limit_service.ts   # Rate limiting
│   │   └── cache_service.ts        # Caching
│   └── middleware/
│       ├── rate_limit_middleware.ts # API rate limiting
│       └── cache_middleware.ts      # Response caching
├── database/
│   └── schema.ts                   # Database schema
├── inertia/
│   └── pages/
│       └── admin/events/           # Admin event management UI
└── tests/
    └── unit/services/              # Service unit tests
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 24+
- MySQL or compatible database
- Redis (for caching and rate limiting)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd eotech

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure database and Redis in .env
# Run database migrations
node ace migration:run

# Start development server
npm run dev
```

### Environment Configuration
```env
# Database
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=eotech

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# File Upload
DRIVE_DISK=local
DRIVE_LOCAL_ROOT=storage
```

## 📊 API Usage

### Creating an Event
```typescript
const formData = new FormData()
formData.append('title', 'My Event')
formData.append('description', 'Event description')
formData.append('location', 'Event location')
formData.append('organizer_contact', 'contact@example.com')
formData.append('registration_start_at', '2024-01-01T10:00:00Z')
formData.append('registration_end_at', '2024-01-01T18:00:00Z')
formData.append('banner', file) // File upload

const response = await fetch('/api/v1/events', {
  method: 'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Rate Limiting
The API implements different rate limits based on endpoint types:
- **Authentication**: 5 requests per 15 minutes
- **File Uploads**: 20 requests per minute
- **API Reads**: 120 requests per minute
- **API Writes**: 60 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 2024-01-01T12:00:00.000Z
```

### Caching
Responses are automatically cached based on endpoint and TTL:
- **Event Lists**: 5 minutes
- **Individual Events**: 5 minutes
- **Public Events**: 1 hour

Cache headers indicate cache status:
```
X-Cache-Status: HIT/MISS
X-Cache-Time: 2024-01-01T12:00:00.000Z
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm run test:event

# Run with coverage
npm run test:ci
```

## 🔒 Security Features

- **Input Validation**: All inputs are validated using Vine.js
- **File Upload Security**: Strict file type and size validation
- **Rate Limiting**: Prevents API abuse and DoS attacks
- **Authentication**: JWT-based authentication with role checking
- **Authorization**: Owner-based access control for events
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Input sanitization

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexing
- **Response Caching**: Reduces database load for frequently accessed data
- **File Storage**: Efficient file storage with cleanup utilities
- **Pagination**: Cursor-based pagination for large datasets
- **Connection Pooling**: Database connection pooling
- **Compression**: Response compression for faster transfers

## 🚀 Deployment

### Production Checklist
- [ ] Configure production database
- [ ] Set up Redis cluster
- [ ] Configure file storage (S3, etc.)
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting rules
- [ ] Set up backup strategies
- [ ] Configure SSL certificates

### Docker Support
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the test cases for usage examples

## 🔄 Changelog

### Version 2.0.0
- ✅ Enhanced Event Service with file upload support
- ✅ API rate limiting and caching
- ✅ Comprehensive testing suite
- ✅ Improved error handling and validation
- ✅ Performance optimizations
- ✅ Security enhancements