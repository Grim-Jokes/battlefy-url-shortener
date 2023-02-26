import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Url } from "../model"

export async function createGetLongUrl(db: DynamoDB) {
  return async (shortUrl: string): Promise<Url | null> => {
    const result = await db.getItem({
      TableName: "url",
      Key: {
        'shortUrl': { S: shortUrl }
      },
      ProjectionExpression: "longUrl"
    });

    if (!result.Item) {
      return null;
    }

    return new Url({
      shortUrl,
      longUrl: result.Item.longUrl.S as string
    })
  }
}