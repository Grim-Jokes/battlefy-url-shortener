 import { DynamoDB } from "@aws-sdk/client-dynamodb";

declare global {
  var dynamoClient: DynamoDB;
}