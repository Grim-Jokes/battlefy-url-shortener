import { Pool, PoolClient } from "pg"

import { DynamoDB } from "@aws-sdk/client-dynamodb";

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

let docClient: DynamoDB;

export async function getClient(): Promise<DynamoDB> {
  if (docClient) {
    return docClient;
  }

  docClient = new DynamoDB({
    endpoint: "http://localhost:8000",
  })

  return docClient;

}

export async function close() {
  return pool.end()
}