import { Err, Ok, Result } from "ts-results";

// 将 Promise 转换为 Result 类型，捕获 reject 导致的抛出
export async function promise2Result<T>(
  p: Promise<T>,
): Promise<Result<T, string>> {
  return new Promise((resolve) => {
    p.then((r) => resolve(new Ok(r))).catch((e) =>
      resolve(new Err(e.toString())),
    );
  });
}
