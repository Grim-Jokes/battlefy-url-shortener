import { PoolClient } from "pg";
import { Url } from "../model"

export async function createGetLongUrl(db: PoolClient) {
  return async (shortUrl: string): Promise<Url | null> => {
    const result = await db.query("SELECT long_url FROM url WHERE short_url = $1", [shortUrl])

    if (result.rowCount == 0) {
      return null;
    }

    return new Url({
      shortUrl,
      longUrl: result.rows[0].long_url
    })
  }
}