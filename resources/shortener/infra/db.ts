import { DynamoDB } from "@aws-sdk/client-dynamodb";

let docClient: DynamoDB;

export async function getClient(): Promise<DynamoDB> {
  if (docClient) {
    return docClient;
  }

  docClient = new DynamoDB({
    endpoint: "http://localhost:8000",
  })

  return docClient;

}