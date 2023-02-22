import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as url_shortener_service from './url-shortener-stack';


export class BattlefyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     new url_shortener_service.UrlShortenerService(this, "UrlShortener");
     
  }
}
