
# Task Manager

This project is an implementation of an authentication service using Express and TypeScript. It follows best practices such as Dependency Injection, Asynchronous Programming, and Secure Password Handling using `bcrypt` and JWT.

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
   JWT_SECRET=your_jwt_secret_key

## Running the Application

### Locally
- npm run start

## Features
- Calendar Events Management: Allows users to create, update, retrieve, and delete calendar events, ensuring that events are associated with the correct user.

## License

This project is licensed under the MIT License.
