import { Construct } from "constructs";
import * as path from 'path'
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";


export class UrlShortenerService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = this.setupDb()
    const handler = this.setupLambdaHandler(table)
    this.setupApiGateway(handler)
  }

  private setupLambdaHandler(table: dynamodb.Table) {
    const handler = new lambda.Function(this, "UrlShortener", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources/shortener"),
      handler: "main.main",
      environment: {
        DYNAMO_TABLE_NAME: table.tableName,
        DYNAMO_ENDPOINT: "https://dynamodb.us-east-1.amazonaws.com"
      },
    });
    table.grantReadWriteData(handler)

    return handler;
  }

  private setupDb() {
    return new dynamodb.Table(this, "url", {
      partitionKey: {
        name: "shortUrl",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY
    });
  }

  private setupApiGateway(handler: lambda.Function) {
    const api = new apigateway.RestApi(this, "url-shortener-api", {
      restApiName: "Url Shortening Service",
    });

    const apiIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: false,
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });


    api.root.addMethod("POST", apiIntegration);

    const urlIntegration = new apigateway.LambdaIntegration(handler);

    const shortUrl = api.root.addResource("{id}");

    shortUrl.addMethod("GET", urlIntegration);    // GET /{id}
  }
}