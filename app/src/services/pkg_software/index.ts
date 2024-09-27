import { Err, Result } from "ts-results";
import { MirrorPkgSoftware } from "@/type";
import { CACHE_INTERVAL } from "@/constants";
import { softwareCache, updateCache, wait } from "./cache";

updateCache().then(() => setInterval(updateCache, CACHE_INTERVAL));

export async function servicePkgSoftware(): Promise<
  Result<MirrorPkgSoftware, string>
> {
  if (softwareCache.current === null) {
    await wait();
  }
  return softwareCache.current ?? new Err("Error:Fatal:Null cache data");
}
