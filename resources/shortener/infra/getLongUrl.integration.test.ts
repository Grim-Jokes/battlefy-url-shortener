import { createGetLongUrl } from "./getLongUrl";
import { Url } from "../model";

describe("getLongUrl", () => {
  let getLongUrl: (shortUrl: string) => Promise<Url | null>;
  beforeEach(async () => {
    getLongUrl = await createGetLongUrl(globalThis.dynamoClient)
  })

  it("Should save the url in the database", async () => {
    const shortUrl = "test";
    const longUrl = await getLongUrl(shortUrl)

    expect(longUrl).toBe(null)
  });

  it("Should return an existing long url pair", async () => {

    await new Promise((res) => {
      dynamoClient.putItem({
        TableName: process.env.DYNAMO_TABLE_NAME || "url",
        Item: {
          "shortUrl": {
            "S": "short"
          },
          "longUrl": {
            "S": "long"
          }
        }
      }, (_, data) => {
        res(data)
      })
    });

    const url = await getLongUrl("short");
    expect(url).toEqual({
      longUrl: "long",
      _shortUrl: "short"
    })
  });
})