
# Task Manager

This is a task management application built with Node.js, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

## Installation

1. Clone the repository:
   git clone https://github.com/hoangbao/task-manager.git
2. Navigate to the project directory:
   cd task-manager
3. Install dependencies:
   npm install
4. Create a `.env` file  and configuring it according to your environment:
   cp .env
5. Run the migrations:
   npm run migrate

## Running the Application

### Locally
npm run dev
### With Docker

docker-compose up --build

## API Endpoints

- **User Routes**
  - `POST /api/users`: Create a new user
  - `GET /api/users`: Get all users
  - `GET /api/users/:id`: Get a user by ID

- **Calendar Event Routes**
  - `POST /api/calendar-events`: Create a new event
  - `GET /api/calendar-events`: Get all events
  - `GET /api/calendar-events/:id`: Get an event by ID


## License

This project is licensed under the MIT License.
