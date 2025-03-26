# PeerFolio - Professional Review Platform

PeerFolio is a platform where users can rate and review professionals based on their experiences working with them as mentors, interviewers, colleagues, etc. Think of it as Glassdoor, but for individual professionals rather than companies.

## Features

- **User Authentication System**: Sign up/login functionality with secure password storage
- **Profile Pages**: Auto-generated profiles for each person who receives a review
- **Review System**: Submit detailed reviews with ratings, tags, and relationship context
- **Search & Discovery**: Find professionals by name or browse top-rated individuals
- **Moderation System**: Admin panel to approve/reject reviews and handle reports

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Validation**: React Hook Form with Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/peerfolio.git
   cd peerfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env` (or create a new `.env` file)
   - Update the database connection string and authentication secret

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   npx prisma db seed
   ```
   This creates:
   - Sample users (including an admin user)
   - People profiles
   - Reviews with various ratings and tags
   - Sample reports

   Default admin login:
   - Email: admin@example.com
   - Password: password123

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Creating an Admin User

To create an admin user for moderation capabilities:

1. Register a regular user through the application
2. Connect to your database and update the user's role:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

## Project Structure

- `/src/app`: Pages and routes using the App Router
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions, validations, and server actions
- `/prisma`: Database schema and migrations

## Core Workflows

### Submitting a Review

1. Navigate to the "Write a Review" page
2. Enter the LinkedIn URL of the person you want to review
3. Provide details about your relationship and experience
4. Rate the person and provide a detailed review
5. Submit for approval

### Finding Reviews

1. Use the search function to find someone by name
2. Browse the discover page to see top-rated professionals
3. View a person's profile to see all their reviews and ratings

### Admin Moderation

1. Access the admin dashboard at `/admin`
2. Review pending submissions
3. Handle reported reviews
4. Manage users and system settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project was created for educational purposes
- Inspired by platforms like Glassdoor, LinkedIn, and other review sites
