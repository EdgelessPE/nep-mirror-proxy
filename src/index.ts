import Koa from "koa";
import Router from "koa-router";
import { serviceHello } from "./service/hello";
import { Result } from "ts-results";
import { API_HELLO } from "./constants";

const PORT = 3000;

const app = new Koa();
const router = new Router();

router.get(API_HELLO, serviceHello);

// Result 类型中间件
app.use(async (ctx, next) => {
  const result: Result<unknown, string> = await next();
  if (result.ok) {
    ctx.body = result.val;
  } else {
    ctx.response.status = 500;
    ctx.body = {
      msg: result.val,
    };
  }
});
app.use(router.routes());

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
