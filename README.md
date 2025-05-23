# Book Review API

A RESTful API for a Book Review system built with Node.js, Express, and MongoDB.

## Features

- JWT-based user authentication
- Book management with CRUD operations
- Review system with user controls
- Search functionality
- Pagination support

## Database Schema

### User
- id: ObjectId
- name: String
- email: String 
- password: String 
- createdAt: Date

### Book
- id: ObjectId
- title: String
- author: String
- genre: String (enum)
- description: String
- createdBy: ObjectId (ref: User)
- createdAt: Date

### Review
- id: ObjectId
- rating: Number (1-5)
- comment: String
- user: ObjectId (ref: User)
- book: ObjectId (ref: Book)
- createdAt: Date

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/sid-rh/BookReview
```

2. Install NPM packages
```bash
npm install
```

3. Create a .env file in the root directory and add:
```
PORT=8000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

4. Start the server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Login and get token

### Books
- `POST /books` - Add a new book (Auth required)
- `GET /books` - Get all books (with pagination and filters)
- `GET /books/:id` - Get book details by ID
- `GET /books/search` - Search books by title or author

### Reviews
- `POST /books/:id/reviews` - Submit a review (Auth required)
- `PUT /reviews/:id` - Update your review (Auth required, owner only)
- `DELETE /reviews/:id` - Delete your review (Auth required, owner only)

## API Usage Examples

## API Usage Examples (Postman)

### Register a user
```
POST http://localhost:8000/signup
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123"
}
```

### Login
```
POST http://localhost:8000/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "Test@123"
}
```

### Create a book
```
POST http://localhost:8000/books
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
    "title": "The Winds Of Winter",
    "author": "GRRM",
    "genre": "Fantasy",
    "description": "6th book in ASOIAF",   
}
```

### Search books
```
GET http://localhost:8000/books/search?q=gatsby
```

### Add a review
```
POST http://localhost:8000/books/BOOK_ID/reviews
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
    "rating": 5,
    "comment": "Good read",
}
```

## Design Decisions

1. **Authentication:** Used JWT for stateless authentication, making the API easier to scale.

2. **Database Schema:** Designed with proper relationships between books, users, and reviews.

3. **Validation:** Implemented comprehensive input validation using express-validator.

4. **Error Handling:** Created a centralized error handling middleware.

5. **Pagination:** Added pagination to all list endpoints to improve performance.

6. **Security:** 
   - Passwords are hashed using bcrypt
   - Protected routes with authentication middleware
   - Reviews are protected from unauthorized updates/deletions# Book Review API

