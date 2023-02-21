import { Url } from './url'

describe("Url", () => {
  it("should shorted https://google.ca", () => {
    const url = new Url({
      longUrl: "https://google.ca"
    });

    expect(url.shortUrl).not.toBe("")
  })
})