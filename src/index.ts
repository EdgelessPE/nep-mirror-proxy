import Koa from "koa";
import Router from "koa-router";
import { serviceHello } from "./service/hello";
import { Result } from "ts-results";
import { API_HELLO, API_PKG_SOFTWARE } from "./constants";
import { servicePkgSoftware } from "./service/pkg_software";

const PORT = 3000;

const app = new Koa();
const router = new Router();

router.get(API_HELLO, serviceHello);
router.get(API_PKG_SOFTWARE, servicePkgSoftware);

// Result 类型中间件
app.use(async (ctx, next) => {
  const result: Result<unknown, string> | undefined = await next();
  if (result) {
    if (result.ok) {
      ctx.body = result.val;
    } else {
      ctx.response.status = 500;
      ctx.body = {
        msg: result.val,
      };
    }
  } else {
    ctx.response.status = 404;
    ctx.body = {
      msg: "Error:Service matching this path not found",
    };
  }
});
app.use(router.routes());

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
