import path from "path";

export function path_join(...arr: string[]) {
  return path.join(...arr).replace(/\\/g, "/");
}
