import { Url } from "../model"

import { DynamoDB } from "aws-sdk"


export function createSaveUrl(db: DynamoDB) {
  return async (url: Url): Promise<void> => {
    return new Promise((success, rej) => {
      db.putItem({
        TableName: process.env.DYNAMO_TABLE_NAME || "url",
        Item: {
          "shortUrl": {
            "S": url.shortUrl
          },
          "longUrl": {
            "S": url.longUrl
          }
        }
      }, (err, data) => {
        if (err) {
          return rej(err)
        }
        success()
      })
    });
  }
}
