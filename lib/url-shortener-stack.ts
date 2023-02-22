import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class UrlShortenerService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "UrlShortener", {
      runtime: lambda.Runtime.NODEJS_16_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset("resources/shortener"),
      handler: "main.main",
    });

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