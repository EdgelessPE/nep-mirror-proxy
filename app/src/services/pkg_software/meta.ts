import { Option, Some, None } from "ts-results";
import { MetaResult } from "@/types/ept/MetaResult";
import { config } from "@/config";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import TOML from "@iarna/toml";
import { IProxyController } from "@/proxies/type";
import { Downloader } from "nodejs-file-downloader";

export async function getMeta({
  scope,
  softwareName,
  fileName,
  controller,
}: {
  scope: string;
  softwareName: string;
  fileName: string;
  controller: Omit<IProxyController, "init">;
}): Promise<Option<MetaResult>> {
  // 尝试从 meta 存放目录中读取
  const metaFilePath = join(
    config.dir.meta_cache,
    scope,
    softwareName,
    `${fileName}.meta`,
  );

  // 如果不存在则下载
  if (!existsSync(metaFilePath)) {
    const res = await controller.fetchFile(
      join(scope, softwareName, `${fileName}.meta`),
    );
    if (res.ok) {
      console.log(
        `Info: Downloading meta from proxy : ${res.val} to ${metaFilePath}`,
      );
      const downloader = new Downloader({
        url: encodeURI(res.val),
        directory: join(config.dir.meta_cache, scope, softwareName),
        fileName: `${fileName}.meta`,
      });
      try {
        await downloader.download();
      } catch (error) {
        console.warn(
          `Warning: Failed to download meta from ${
            res.val
          } to ${metaFilePath} : ${JSON.stringify(error)}`,
        );
      }
    } else {
      console.warn(`Warning: Failed to fetch meta from proxy : ${res.val}`);
    }
  }

  if (existsSync(metaFilePath)) {
    const metaData = TOML.parse(
      (await readFile(metaFilePath)).toString(),
    ) as MetaResult;
    return new Some(metaData);
  }

  console.warn(`Warning: Meta not found at ${metaFilePath}`);
  return None;
}
