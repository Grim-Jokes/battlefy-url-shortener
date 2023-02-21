import { Url } from "../../../model"

export interface SerializedUrl {
  shortLink: string
}

export function serializeUrl(url: Url): SerializedUrl {
  return {
    shortLink: url.shortUrl
  }
}