import Koa from 'koa';
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser';

import * as handlers from '../handlers'

export const app = new Koa();

app.use(bodyParser())

const urlRouter = new Router()
urlRouter.post("/", handlers.createShortRoute)
urlRouter.get("/:shortUrl", handlers.redirectToLongUrl)

app
  .use(urlRouter.routes())
  .use(urlRouter.allowedMethods())