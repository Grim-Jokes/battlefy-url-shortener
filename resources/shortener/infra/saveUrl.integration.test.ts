import { createSaveUrl } from "./saveUrl";
import { Url } from "../model";

describe("saveUrl", () => {
  let saveUrl: (url: Url) => Promise<number>;
  beforeEach(async () => {
    saveUrl = await createSaveUrl(globalThis.db)
  })

  it("Should save the url in the database", async () => {
    const id = await saveUrl(new Url({
      shortUrl: "short",
      longUrl: "long"
    }))

    expect(id).toBe(1)
  });
})