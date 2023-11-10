import Koa from "koa";
import Router from "koa-router";
import { ex2Routers } from "./router/ex2Router";

const app = new Koa();
const router = new Router();

ex2Routers.forEach((x) => router[x.method](x.path, x.action));

app.use(router.routes());


app.listen(3001, () => {
  console.log("server is runing on http://127.0.0.1:3001");
});
