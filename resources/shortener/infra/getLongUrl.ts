import { config, DynamoDB } from "aws-sdk";
import { Url } from "../model"

export async function createGetLongUrl(db: DynamoDB) {

  return async (shortUrl: string): Promise<Url | null> => {
    let success: (url: Url) => void;
    let fail: (err: Error) => void
    const p = new Promise<Url>((res, rej) => {
      success = res;
      fail = rej;
    });
    await db.getItem({
      TableName: "url",
      Key: {
        'shortUrl': { S: shortUrl }
      },
      ProjectionExpression: "longUrl"
    }, (err, data) => {
      if (err) {
        fail(err)
      }
      // done(data)
      success(new Url({ shortUrl, longUrl: data.Item?.longUrl.S as string }))

    });

    return p;

    // return new Url({
    //   shortUrl,
    //   longUrl: result.Item.longUrl.S as string
    // })
  }
}