import { MirrorHello, ServiceKeys } from "../type";
import { Ok, Result } from "ts-results";
import { config } from "../config";
import { API_EPT_TOOLCHAIN, API_PKG_SOFTWARE } from "../constants";

const SERVICE_PATH_MAP: Record<ServiceKeys, string> = {
  EPT_TOOLCHAIN: API_EPT_TOOLCHAIN,
  PKG_SOFTWARE: API_PKG_SOFTWARE,
};

const cacheHello = new Ok({
  ...config,
  proxy: undefined,
  service: config.service.map((raw) => ({
    key: raw.key,
    path: SERVICE_PATH_MAP[raw.key],
  })),
});

export async function serviceHello(): Promise<Result<MirrorHello, string>> {
  return cacheHello;
}
