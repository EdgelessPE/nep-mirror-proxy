import { Err, Ok, Result } from "ts-results";
import { MirrorEptToolchain, MirrorEptToolchainRelease } from "../type";
import { config } from "../config";
import { createController } from "../proxies";
import { path_join } from "../utils";
import { CACHE_INTERVAL, REDIRECT_ROUTE_PATH } from "../constants";

let cache: Result<MirrorEptToolchain, string> | null = null;
let queueCallbacks: (() => void)[] = [];

async function fetchEptToolchain(): Promise<
  Result<MirrorEptToolchain, string>
> {
  // 初始化
  const serviceDefNode = config.service.find((n) => n.key === "EPT_TOOLCHAIN");
  if (!serviceDefNode) {
    return new Err(
      `Error:No service with key 'EPT_TOOLCHAIN' defined in config`,
    );
  }
  const basePath = serviceDefNode.path;
  const controllerRes = await createController(basePath);
  if (controllerRes.err) {
    return controllerRes;
  }
  const controller = controllerRes.unwrap();

  // 读取列表
  const readRes = await controller.readDir("");
  if (readRes.err) {
    return readRes;
  }
  const releases: MirrorEptToolchainRelease[] = readRes.val
    .filter((n) => n.name.match(/^ept_[0-9.]+\.zip$/))
    .map(({ name, size, timestamp }) => ({
      name,
      version: name.slice(4, -4),
      url:
        path_join(config.root_url, REDIRECT_ROUTE_PATH) +
        `?path=${basePath}/${name}`,
      size,
      timestamp,
    }));
  return new Ok({
    update: config.update,
    releases,
  });
}

const updateCache = async () => {
  console.log("Info:Updating ept toolchain");
  cache = await fetchEptToolchain();
  if (queueCallbacks.length > 0) {
    queueCallbacks.forEach((fn) => fn());
    queueCallbacks = [];
  }
  console.log("Info:Updated ept toolchain");
};

updateCache().then(() => setInterval(updateCache, CACHE_INTERVAL));

export async function serviceEptToolchain(): Promise<
  Result<MirrorEptToolchain, string>
> {
  if (cache === null) {
    const wait = async () => {
      return new Promise<void>((resolve) => {
        queueCallbacks.push(resolve);
      });
    };
    await wait();
  }
  return cache!;
}
