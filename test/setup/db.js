const { getClient } = require("../../resources/shortener/infra/db")

const DB_CONFIG = {
  driver: "pg",
  user: "postgres",
  password: "postgres"

}

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
  await client.createTable(params);
})


afterAll(async () => {
  await client.deleteTable({ TableName: "url" })
})