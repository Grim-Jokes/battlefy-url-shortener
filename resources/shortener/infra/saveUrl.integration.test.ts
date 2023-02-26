import { createSaveUrl } from "./saveUrl";
import { Url } from "../model";

describe("saveUrl", () => {
  let saveUrl: (url: Url) => Promise<void>;
  beforeEach(async () => {
    saveUrl = await createSaveUrl(globalThis.dynamoClient)
  })

  it("Should save the url in the database", async () => {
    const id = await saveUrl(new Url({
      shortUrl: "short",
      longUrl: "long"
    }))
  });
})