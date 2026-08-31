import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // Create Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        data JSONB NOT NULL
      );
    `;

    // Create a general Data Table for Projects, Blog, Certificates, etc.
    await sql`
      CREATE TABLE IF NOT EXISTS collections (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) UNIQUE NOT NULL,
        data JSONB NOT NULL
      );
    `;

    return response.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
