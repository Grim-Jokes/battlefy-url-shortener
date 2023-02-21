import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class UrlShortenerService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "UrlShortener", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources/shortener", { "exclude": ["*.test.ts"] }),
      handler: "main.main"
    })

    const api = new apigateway.RestApi(this, "short-url-api", {
      restApiName: "Url Shortening Service",
      description: "This service shortens and redirects urls"
    });

    const apiIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: false,
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    })


    api.root.addMethod("POST", apiIntegration)

    const urlIntegration = new apigateway.LambdaIntegration(handler, { proxy: false })

    api.root.addResource("{shortUrl}").addMethod("GET", urlIntegration)

  }
}