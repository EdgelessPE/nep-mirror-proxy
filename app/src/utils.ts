import urlJoin from "url-join";

export function path_join(...arr: string[]) {
  return urlJoin(...arr);
}
