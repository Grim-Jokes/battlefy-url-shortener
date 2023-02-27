import { Url } from "../model"

import { DynamoDB } from "aws-sdk"


export function createSaveUrl(db: DynamoDB) {
  console.info("creating save url fn")
  return async (url: Url): Promise<void> => {
    console.info(`Inserting ${url.shortUrl} - ${url.longUrl} into ${process.env.DYNAMO_TABLE_NAME || "url"}`)
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
      }, (err) => {
        if (err) {
          return rej(err)
        }
        success()
      })
    });
  }
}
