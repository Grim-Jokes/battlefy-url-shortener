import { Pool, PoolClient } from "pg"

let pool: Pool;

export function getDb(): Promise<PoolClient> {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DATABASE || "url" // Can be replaced for testing purposesu
    })
  }

  return pool.connect()
}

export async function close() {
  return pool.end()
}