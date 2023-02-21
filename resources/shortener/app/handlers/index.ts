import { Url } from "../../model"
import { serializeUrl } from "./serializers/url"

interface CreateShortUrlBody {
  url?: string
}

export function createShortUrl(body: CreateShortUrlBody) {

  if (body.url) {
    const url = new Url({ longUrl: body.url })
    return serializeUrl(url)
  }

  throw Error("url was not defined")

}

export function redirectToLongUrl() {

}