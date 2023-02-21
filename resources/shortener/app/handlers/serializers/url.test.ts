import { Url } from '../../../model'
import { serializeUrl } from './url'

describe("serializeUrl", () => {
  it("Should serialize the URL object", () => {
    // Arange
    const testUrl = new Url({ longUrl: "test", shortUrl: "test2" })
    // Act
    const serializedUrl = serializeUrl(testUrl)
    //Assert
    expect(serializedUrl).toEqual({
      shortLink: "test2"
    })
  })
})