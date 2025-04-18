# Farmley E-Commerce Website

A modern e-commerce website for Farmley dry fruits with product showcase, company information, and contact functionality.

## Features

- Product browsing and filtering by categories
- Product detail pages with descriptions and pricing
- About page with company information
- Contact form with validation
- Responsive design for mobile, tablet, and desktop
- PostgreSQL database for persistent data storage

## Tech Stack

### Frontend
- React with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- React Hook Form for form handling
- Zod for validation

### Backend
- Express.js
- PostgreSQL database
- Drizzle ORM for database access
- Vite for development and production builds

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/              # Source code
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and API clients
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Entry point
│   └── index.html        # HTML template
├── server/               # Backend Express application
│   ├── db.ts             # Database configuration
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Vite development server integration
└── shared/               # Shared code between frontend and backend
    └── schema.ts         # Database schema and type definitions
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/manas284/lnd.git
   cd lnd
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your PostgreSQL connection string:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/farmley_db
     ```

4. Run database migrations
   ```bash
   npm run db:push
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Deployment

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

This project is licensed under the MIT License.