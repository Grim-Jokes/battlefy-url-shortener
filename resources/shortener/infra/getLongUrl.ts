import { config, DynamoDB } from "aws-sdk";
import { Url } from "../model"

export async function createGetLongUrl(db: DynamoDB) {

  return async (shortUrl: string): Promise<Url | null> => {

    return new Promise((success, fail) => db.getItem({
      TableName: process.env.DYNAMO_TABLE_NAME || "url",
      Key: {
        'shortUrl': { S: shortUrl }
      },
      ProjectionExpression: "longUrl"
    }, (err, data) => {
      if (err) {
        return fail(err)
      }

      if (!data.Item) {
        return success(null)
      }

      success(new Url({ 
        shortUrl, 
        longUrl: data.Item?.longUrl.S as string 
      }))
    }));
  }
}