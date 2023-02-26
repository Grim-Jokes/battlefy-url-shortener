import { DynamoDB } from "aws-sdk"

declare global {
  const dynamoClient: DynamoDB;
}