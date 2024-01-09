import { Result } from "ts-results";
import { CACHE_INTERVAL } from "./constants";

// 缓存逻辑封装
function cacheFactory<T>() {
  const map: Map<string, [Result<T, string>, number]> = new Map();

  return async (
    key: string,
    fetchWith: (key: string) => Promise<Result<T, string>>,
  ): Promise<Result<T, string>> => {
    const [cached, timestamp = 0] = map.get(key) ?? [];
    if (!cached || Date.now() - timestamp > CACHE_INTERVAL) {
      const freshRes = await fetchWith(key);
      map.set(key, [freshRes, Date.now()]);
      return freshRes;
    }
    return cached;
  };
}

export const RedirectCache = cacheFactory<string>();
