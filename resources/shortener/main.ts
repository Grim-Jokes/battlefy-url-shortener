import { APIGatewayEvent, Context } from "aws-lambda";
import * as  handlers from "./app/handlers";

/* 
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern. 
AWS supports both the async-await and promises patterns.
For more information, see the following: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html 
*/

export function main(event: APIGatewayEvent, _context: Context) {
  try {
    var method = event.httpMethod;

    switch (method) {
      case "POST":
        if (event.path === "/") {
          let body;
          if (event.body) {
            const data = JSON.parse(event.body)
            body = handlers.createShortUrl(data)
          }
          return {
            isBase64Encoded: false,
            statusCode: 200,
            headers: {},
            body: JSON.stringify(body)
          };
        }
        break;
      case "GET":
        const shortUrl = event.pathParameters?.shortUrl;
        console.log("Short URL is: ", shortUrl)

        return {
          isBase64Encoded: false,
          statusCode: 200,
          headers: {},
          body: JSON.stringify(shortUrl)
        };
    }

    return {
      isBase64Encoded: false,
      statusCode: 400,
      headers: {},
      body: JSON.stringify({ error: `method ${method} is not supported` })
    };
  } catch (error) {
    var body = (error as Error).stack || JSON.stringify(error, null, 2);
    return {
      isBase64Encoded: false,
      statusCode: 400,
      headers: {},
      body: JSON.stringify(body)
    }
  }
}