import Koa from "koa";
import Router from "koa-router";
import { ex2Routers } from "./router/ex2Router";
import { ex1Routers } from "./router/ex1Router";
import { ex3Routers } from "./router/ex3Router";

const app = new Koa();
const router = new Router();

ex1Routers.forEach((x) => router[x.method](x.path, x.action));
ex2Routers.forEach((x) => router[x.method](x.path, x.action)); 
ex3Routers.forEach((x) => router[x.method](x.path, x.action));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(router.routes());

app.listen(3001, () => {
  console.log("server is runing on http://127.0.0.1:3001");
});
