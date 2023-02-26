import { DynamoDB, config } from "aws-sdk";

config.update({ region: 'us-east-1' });

let docClient: DynamoDB;

export async function getClient(): Promise<DynamoDB> {
  if (docClient) {
    return docClient;
  }

  docClient = new DynamoDB({
    endpoint: process.env.DYNAMO_ENDPOINT || "http://localhost:8000",
  })

  return docClient;

}