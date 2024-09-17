import Koa from "koa";
import Router from "koa-router";
import serve from "koa-static";
import { serviceHello } from "./services/hello";
import { Result } from "ts-results";
import {
  API_EPT_LATEST,
  API_EPT_TOOLCHAIN,
  API_HELLO,
  API_PKG_SOFTWARE,
  REDIRECT_ROUTE_PATH,
} from "./constants";
import { servicePkgSoftware } from "./services/pkg_software";
import { serviceRedirect } from "./services/redirect";
import {
  serviceEptLatest,
  serviceEptToolchain,
} from "./services/ept_toolchain";

const PORT = 2331;

const app = new Koa();
const router = new Router();

app.use(serve("web-dist"));

router.get(API_HELLO, serviceHello);
router.get(API_PKG_SOFTWARE, servicePkgSoftware);
router.get(API_EPT_TOOLCHAIN, serviceEptToolchain);
router.get(API_EPT_LATEST, serviceEptLatest);
router.get(REDIRECT_ROUTE_PATH, serviceRedirect);

// Result 类型中间件
app.use(async (ctx, next) => {
  const result: Result<unknown, string> | undefined = await next();
  if (result) {
    if (result.ok) {
      // 处理 Ok
      const res = result.val;
      // 约定如果返回 OkImpl<string> 则进行重定向
      if (typeof res === "string") {
        ctx.redirect(res);
      } else {
        ctx.body = res;
      }
    } else {
      // 处理 Err
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
