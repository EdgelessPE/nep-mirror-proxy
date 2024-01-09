import { Result } from "ts-results";
import { RouterContext } from "koa-router";
import { createController } from "../proxies";
import { CACHE_INTERVAL } from "../constants";

const controllerPromise = createController("");
const redirectCache = new Map<string, [Result<string, string>, number]>();
async function fetch(path: string): Promise<Result<string, string>> {
  // 初始化控制器
  const controllerRes = await controllerPromise;
  if (controllerRes.err) {
    return controllerRes;
  }
  const controller = controllerRes.unwrap();

  // 更新缓存
  const [cached, timestamp = 0] = redirectCache.get(path) ?? [];
  if (!cached || Date.now() - timestamp > CACHE_INTERVAL) {
    const fetchRes = await controller.fetchFile(path);
    redirectCache.set(path, [fetchRes, Date.now()]);

    return fetchRes;
  }

  return cached;
}

export async function serviceRedirect(
  ctx: RouterContext,
): Promise<Result<string, string>> {
  const { path } = ctx.request.query as {
    path: string;
  };

  return fetch(path);
}
