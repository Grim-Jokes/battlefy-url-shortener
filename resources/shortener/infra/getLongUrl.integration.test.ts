import { createGetLongUrl } from "./getLongUrl";
import { Url } from "../model";

describe("getLongUrl", () => {
  let getLongUrl: (shortUrl: string) => Promise<Url | null>;
  beforeEach(async () => {
    getLongUrl = await createGetLongUrl(globalThis.db)
  })

  it("Should save the url in the database", async () => {
    const shortUrl = "test";
    const longUrl = await getLongUrl(shortUrl)

    expect(longUrl).toBe(null)
  });

  it("Should return an existing long url pair", async () => {
    const result = await globalThis.db.query(
      `INSERT INTO "url" (long_url, short_url) VALUES ($1, $2)
      RETURNING id`, ["long", "short"]
    );

    const url = await getLongUrl("short");
    expect(url).toEqual({
      id: result.rows[0].id,
      longUrl: "long",
      _shortUrl: "short"
    })
  });
})