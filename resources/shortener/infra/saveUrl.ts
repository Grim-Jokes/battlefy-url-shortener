import { PoolClient } from "pg"
import { Url } from "../model"

export async function createSaveUrl(db: PoolClient) {
  return async (url: Url) => {
    // Not catching error as we need the caller to handle it
    const result = await db.query<{ id: number }>("INSERT INTO url (long_url, short_url) VALUES ($1, $2) RETURNING id", [
      url.longUrl,
      url.shortUrl
    ])

    if (result.rowCount != 1) {
      throw new Error(`Insert failed. Row count is ${result.rowCount}`)
    }
    return result.rows[0].id
  }
}
