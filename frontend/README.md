# Smart Library Borrowing System

A full-stack web application that allows students to borrow books, track active borrows, manage returns, and view borrowing statistics through a dashboard.

## Features

### Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- User Profile Access

### Book Management

- View all available books
- Predefined book collection stored in MongoDB
- Book availability tracking

### Borrowing System

- Borrow books for 1–7 days
- One active borrow per user
- Availability validation
- Cost calculation based on borrow duration
- Automatic due date calculation

### Return System

- Return borrowed books
- Update book availability automatically
- Store return date
- Move records to borrowing history

### Dashboard

- Current Active Book
- Due Date
- Total Amount Due
- Borrow History Count

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt

### Database

- MongoDB Atlas
- Mongoose

---

## Project Structure

### Backend

```text
backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── seedBooks.js
└── index.js
```

### Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
```

---

## API Endpoints

### Authentication

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/auth/signup  |
| POST   | /api/auth/login   |
| GET    | /api/auth/profile |

### Books

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/books     |
| GET    | /api/books/:id |

### Borrow

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/borrow                  |
| POST   | /api/borrow/:borrowId/submit |

### Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

---

## Borrowing Rules

- User must be authenticated.
- User can borrow only one book at a time.
- Book must be available.
- Borrow duration must be between 1 and 7 days.
- Cost is calculated as:

```text
Total Cost = Price Per Day × Number Of Days
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_DB=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRES=7d
```

---

## Installation

### Backend

```bash
npm install
npm start
```

### Frontend

```bash
npm install
npm run dev
```

---

## Future Improvements

- Payment History
- Overdue Fine Calculation
- Borrow History Page
- Search Books
- Pagination
- Admin Panel
- Email Notifications

---

## Author

Sultan Akhter

Frontend Developer | React.js | JavaScript | Node.js | MongoDB
