import { APIGatewayEvent } from "aws-lambda";
import { Context } from "vm";
import * as handlers from './app/handlers'
import { getClient } from "./infra/db";
import { createGetLongUrl } from "./infra/getLongUrl";
import { createSaveUrl } from "./infra/saveUrl";

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
exports.main = async function (event: APIGatewayEvent, context: Context) {
  try {
    const method = event.httpMethod;
    // Get name, if present
    let shortUrl;
    if (event.pathParameters) {
      ({ id: shortUrl } = event.pathParameters)
    }

    if (method === "GET") {
      if (shortUrl) {
        const client = await getClient()
        const getLongUrl = await createGetLongUrl(client)
        // GET / to get info on widget name
        const url = await handlers.redirectToLongUrl(shortUrl, getLongUrl)
        if (url) {
          return {
            statusCode: 302,
            headers: {
              'Location': url.longUrl
            },
          };
        } else {
          return {
            statusCode: 404
          }
        }
      }
    }

    if (method === "POST") {
      if (event.body) {
        const client = await getClient()
        const saveUrl = createSaveUrl(client)
        const url = await handlers.createShortUrl(
          JSON.parse(event.body),
          saveUrl,
        )
        return {
          statusCode: 201,
          headers: {},
          body: JSON.stringify(url)
        };
      }
    }

    // We got something besides a GET, POST, or DELETE
    return {
      statusCode: 400,
      headers: {},
      body: "Invalid request for " + method
    };
  } catch (error) {
    const body = (error as Error).stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: body
    }
  }
}