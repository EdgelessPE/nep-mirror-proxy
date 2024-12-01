import { Option, Some, None } from "ts-results";
import { MetaResult } from "@/types/ept/MetaResult";
import { config } from "@/config";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import TOML from "@iarna/toml";

export async function getMeta({
  scope,
  softwareName,
  fileName,
}: {
  scope: string;
  softwareName: string;
  fileName: string;
}): Promise<Option<MetaResult>> {
  // 从 meta 存放目录中读取
  const metaFilePath = join(
    config.dir.meta_cache,
    scope,
    softwareName,
    `${fileName}.meta`,
  );
  if (existsSync(metaFilePath)) {
    const metaData = TOML.parse(
      (await readFile(metaFilePath)).toString(),
    ) as MetaResult;
    return new Some(metaData);
  }

  console.warn(`Warning: Meta not found at ${metaFilePath}`);
  return None;
}
