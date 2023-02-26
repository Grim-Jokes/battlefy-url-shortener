const { getClient } = require("../../resources/shortener/infra/db")


let client;
beforeAll(async () => {
  client = await getClient()
  globalThis.dynamoClient = client;

  const params = {
    TableName: "url",
    KeySchema: [
      {
        AttributeName: "shortUrl",
        KeyType: "HASH"
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "shortUrl",
        AttributeType: "S"
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
  }

  await new Promise((res, rej) => {
    client.createTable(params, function (err, data) {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    });
  });
})


afterAll(async () => {
  await new Promise((res, rej) => {
    client.deleteTable({ TableName: "url" }, function (err, data) {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    });
  });
})