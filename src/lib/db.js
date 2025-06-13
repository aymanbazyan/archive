import { Pool } from "pg";

let pool;

// Create a connection pool.
// Vercel will inject the connection string as an environment variable, e.g., POSTGRES_URL
// You can also use individual variables like POSTGRES_HOST, POSTGRES_USER, etc.
if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false, // Use this for Render/Vercel if you encounter SSL issues,
      // though Vercel handles SSL transparently for Postgres.
      // If using a different host, ensure correct SSL options.
    },
  });
} else {
  // Fallback for local development if you don't set POSTGRES_URL
  console.warn(
    "POSTGRES_URL environment variable not set. Using a mock pool for local development. Database operations will not work."
  );
  // Provide a mock pool for local dev if POSTGRES_URL is not set.
  // This prevents the app from crashing if you try to call `query` without a database.
  pool = {
    connect: async () => ({
      query: async () => {
        throw new Error("Database connection string not set.");
      },
      release: () => {},
    }),
    query: async () => {
      throw new Error("Database connection string not set.");
    },
  };
}

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}
