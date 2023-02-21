export interface UrlParams {
  longUrl: string
  shortUrl?: string
}


// TODO: Potentially randomize the order of characters
const CHARMAP = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


export class Url {
  public readonly longUrl: string;
  private _shortUrl: string = '';

  constructor(params: UrlParams) {
    this.longUrl = params.longUrl

    if (!params.shortUrl) {
      this.shortenUrl()
    } else {
      this._shortUrl = params.shortUrl
    }
  }

  private shortenUrl() {

    let shortUrl = [];

    for (let i = 0; i < this.longUrl.length; i++) {
      let character = this.longUrl.charCodeAt(i)

      shortUrl.push(CHARMAP[character % CHARMAP.length])
    }

    this._shortUrl = shortUrl.join("")
  }

  public get shortUrl() {
    return this._shortUrl;
  }
}