import { Url } from "../../model"
import { serializeUrl } from "./serializers/url"

interface CreateShortUrlBody {
  url?: string
}

export async function createShortUrl(
  body: CreateShortUrlBody,
  saveUrl: (url: Url) => Promise<void>
) {
  
  if (body.url) {
    const url = new Url({ longUrl: body.url })
    await saveUrl(url)

    return serializeUrl(url)
  }

  throw Error("url was not defined")

}

export function redirectToLongUrl(shortUrl: string) {
  return ""
}