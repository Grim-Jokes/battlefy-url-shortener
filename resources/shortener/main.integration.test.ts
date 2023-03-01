const main = require('./main');

describe("test", () => {

  it("Should save a url", async () => {

    const { body, statusCode } = await main.main({
      httpMethod: "POST",
      body: JSON.stringify({ url: "http://www.google.ca" })
    });

    const { shortLink } = JSON.parse(body);

    expect(statusCode).toBe(201)

    const result = await new Promise((success, fail) => dynamoClient.getItem({
      TableName: process.env.DYNAMO_TABLE_NAME || "url",
      Key: {
        'shortUrl': { S: shortLink }
      },
      ProjectionExpression: "longUrl"
    }, (err, data) => {
      if (err) {
        return fail(err)
      }

      if (!data.Item) {
        return success(null)
      }

      success(data.Item?.longUrl.S as string)
    }));

    expect(result).toEqual("http://www.google.ca")
  })

  it.only("Should get url", async () => {

    const { body } = await main.main({
      httpMethod: "POST",
      body: JSON.stringify({ url: "http://www.google.ca" })
    });

    const { shortLink } = JSON.parse(body);

    const response = await main.main({ httpMethod: "GET", pathParameters: { id: `${shortLink}` } })

    expect(response.statusCode).toBe(302)
    expect(response.headers).toMatchObject({
      "Location": "http://www.google.ca"
    })
  })

})