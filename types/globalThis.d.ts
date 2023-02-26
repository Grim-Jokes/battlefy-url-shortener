 import { DynamoDB } from "aws-sdk";

declare global {
  var dynamoClient: DynamoDB;
}