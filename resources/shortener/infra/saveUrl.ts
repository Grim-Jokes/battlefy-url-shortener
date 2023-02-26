import { Url } from "../model"

import { DynamoDB } from "aws-sdk"


export function createSaveUrl(db: DynamoDB) {
  return async (url: Url): Promise<void> => {
    // Not catching error as we need the caller to handle it
    await db.putItem({
      TableName: "url",
      Item: {
        "shortUrl": {
          "S": url.shortUrl
        },
        "longUrl": {
          "S": url.longUrl
        }
      }
    });
  }
}
