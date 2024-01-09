import { Result } from "ts-results";
import { RouterContext } from "koa-router";
import { createController } from "../proxies";
import { getRedirectCache } from "../cache";

const controllerPromise = createController("");
async function fetch(path: string): Promise<Result<string, string>> {
  // 初始化控制器
  const controllerRes = await controllerPromise;
  if (controllerRes.err) {
    return controllerRes;
  }
  const controller = controllerRes.unwrap();

  return controller.fetchFile(path);
}

export async function serviceRedirect(
  ctx: RouterContext,
): Promise<Result<string, string>> {
  const { path } = ctx.request.query as {
    path: string;
  };

  return getRedirectCache(path, fetch);
}
