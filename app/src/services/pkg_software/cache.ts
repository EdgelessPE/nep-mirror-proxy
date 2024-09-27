import { Result } from "ts-results";
import { MirrorPkgSoftware } from "../../type";
import { fetchPkgSoftware } from "./data";

export let softwareCache: {
  current: Result<MirrorPkgSoftware, string> | null;
  timestamp: number;
} = {
  current: null,
  timestamp: 0,
};
let queueCallbacks: (() => void)[] = [];

export const updateCache = async () => {
  console.log(`Info: Updating software packages...`);
  softwareCache = {
    current: await fetchPkgSoftware(),
    timestamp: Date.now(),
  };
  if (queueCallbacks.length > 0) {
    queueCallbacks.forEach((fn) => fn());
    queueCallbacks = [];
  }
  console.log(`Info: Updated software packages`);
};

export const wait = async () => {
  return new Promise<void>((resolve) => {
    queueCallbacks.push(resolve);
  });
};
