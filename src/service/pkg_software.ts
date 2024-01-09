import { Err, ErrImpl, Ok, Result } from "ts-results";
import path from "path";
import { MirrorPkgSoftware, MirrorPkgSoftwareRelease } from "../type";
import { IProxyController } from "../proxies/type";
import { createController } from "../proxies";
import { config } from "../config";
import { REDIRECT_TEMPLATE } from "../constants";

function readFactory(controller: Omit<IProxyController, "init">) {
  return async function read(path: string, isDir: boolean) {
    const listRes = await controller.readDir(path);
    if (listRes.err) {
      throw listRes;
    }
    return listRes.unwrap().filter((n) => n.isDir === isDir);
  };
}

export async function fetchPkgSoftware(): Promise<
  Result<MirrorPkgSoftware, string>
> {
  // 初始化读函数
  const serviceDefNode = config.service.find((n) => n.key === "PKG_SOFTWARE");
  if (!serviceDefNode) {
    return new Err(
      `Error:No service with key 'PKG_SOFTWARE' defined in config`,
    );
  }
  const controllerRes = await createController(config.proxy.typeKey, {
    rootUrl: config.proxy.rootUrl,
    basePath: serviceDefNode.path,
  });
  if (controllerRes.err) {
    return controllerRes;
  }
  const controller = controllerRes.unwrap();
  const read = readFactory(controller);

  // 创建层级读取闭包
  // scope -> software -> releases
  const readReleases = async (
    softwarePath: string,
  ): Promise<MirrorPkgSoftwareRelease[]> => {
    const releaseList = await read(softwarePath, false);
    return releaseList.map((file) => ({
      fileName: file.name,
      size: file.size,
      timestamp: file.timestamp,
    }));
  };
  const readSoftwares = async (
    scopePath: string,
  ): Promise<MirrorPkgSoftware["tree"][string]> => {
    const softwareList = await read(scopePath, true);
    const readReleasePromises = softwareList.map((dir) =>
      readReleases(dir.path),
    );
    const release = await Promise.all(readReleasePromises);
    return softwareList.map((dir, index) => ({
      name: dir.name,
      releases: release[index],
    }));
  };
  const readScopes = async (): Promise<MirrorPkgSoftware["tree"]> => {
    const scopeList = await read("/", true);
    const tree: MirrorPkgSoftware["tree"] = {};
    for (const scope of scopeList) {
      tree[scope.name] = await readSoftwares(scope.path);
    }
    return tree;
  };

  // 收集存储信息
  try {
    const tree = await readScopes();
    return new Ok({
      tree,
      timestamp: Date.now(),
      url_template: path
        .join(
          config.proxy.rootUrl,
          `${REDIRECT_TEMPLATE}?proxyType=${config.proxy.typeKey}`,
        )
        .replace(/\\/g, "/"),
    });
  } catch (e) {
    return e as ErrImpl<string>;
  }
}
