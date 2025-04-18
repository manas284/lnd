import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Check for DATABASE_URL environment variable
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create connection pool with retry logic
const createPool = () => {
  try {
    return new Pool({ 
      connectionString: process.env.DATABASE_URL,
      // Add connection pool settings suitable for production
      max: 10, // Maximum number of clients the pool should contain
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 5000, // Maximum time to wait for a connection from the pool,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  } catch (error) {
    console.error("Failed to create database pool:", error);
    throw error;
  }
};

export const pool = createPool();
export const db = drizzle(pool, { schema });