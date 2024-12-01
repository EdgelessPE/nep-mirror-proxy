import { MirrorHello, ServiceKeys } from "@/types";
import { Ok, Result } from "ts-results";
import { config } from "@/config";
import { API_EPT_TOOLCHAIN, API_HELLO, API_PKG_SOFTWARE } from "@/constants";

const SERVICE_PATH_MAP: Record<ServiceKeys, string> = {
  HELLO: API_HELLO,
  PKG_SOFTWARE: API_PKG_SOFTWARE,
  EPT_TOOLCHAIN: API_EPT_TOOLCHAIN,
};

const service = config.service.map((raw) => ({
  key: raw.key,
  path: SERVICE_PATH_MAP[raw.key],
}));

export async function serviceHello(): Promise<Result<MirrorHello, string>> {
  return new Ok({
    ...config,
    proxy: undefined,
    dir: undefined,
    service,
  });
}
