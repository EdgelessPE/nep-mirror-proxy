import { MirrorHello } from "../type";
import { Ok, Result } from "ts-results";
import { config } from "../config";

const cacheHello = new Ok({
  ...config,
  proxy: undefined,
});

export async function serviceHello(): Promise<Result<MirrorHello, string>> {
  return cacheHello;
}
