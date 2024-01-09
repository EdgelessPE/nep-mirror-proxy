import { ControllerCtx, FileNode, IProxyController } from "../type";
import { Err, Ok, Result } from "ts-results";
import axios from "axios";
import { promise2Result } from "../utils";
import dayjs from "dayjs";
import { path_join } from "../../utils";
import { config } from "../../config";

interface Content {
  is_dir: boolean;
  modified: string;
  name: string;
  sign: string;
  size: number;
  thumb: string;
  type: number;
}

async function fsList(p: string, { rootUrl }: ControllerCtx) {
  const apiUrl = path_join(rootUrl, "/api/fs/list");
  const body: {
    path: string;
    password?: string;
    page?: number;
    per_page?: number;
    refresh?: boolean;
  } = {
    path: p,
    page: 1,
    per_page: 0,
  };
  return axios.post<{
    code: number;
    data: {
      content: Content[];
      provider: string;
      readme: string;
      total: number;
      write: boolean;
    };
    message: string;
  }>(apiUrl, body);
}

async function fsGet(p: string, { rootUrl }: ControllerCtx) {
  const apiUrl = path_join(rootUrl, "/api/fs/get");
  const body: { path: string; password?: string } = {
    path: p,
  };
  return axios.post<{
    code: number;
    data: {
      is_dir: boolean;
      modified: string;
      name: string;
      provider: string;
      raw_url: string;
      readme: string;
      related: null;
      sign: string;
      size: number;
      thumb: string;
      type: number;
    };
    message: string;
  }>(apiUrl, body);
}

export function AListControllerFactory(ctx: ControllerCtx): IProxyController {
  const join = (p: string) => path_join(ctx.basePath, p);
  async function init() {
    return new Ok(undefined);
  }
  async function readDir(_p: string): Promise<Result<FileNode[], string>> {
    const p = join(_p);
    const data = await promise2Result(fsList(p, ctx));
    if (data.err) return data;
    const axiosRes = data.unwrap().data;
    if (axiosRes.code !== 200) {
      return new Err(
        `Error:AList api returned code ${axiosRes.code} when reading dir ${p}`,
      );
    }
    const res: FileNode[] = axiosRes.data.content.map(
      ({ name, modified, size, is_dir }) => ({
        path: path_join(_p, name),
        name,
        size,
        timestamp: dayjs(modified).unix(),
        isDir: is_dir,
      }),
    );
    return new Ok(res);
  }
  async function fetchFile(_p: string): Promise<Result<string, string>> {
    const p = join(_p);
    const data = await promise2Result(fsGet(p, ctx));
    if (data.err) return data;
    const axiosRes = data.unwrap().data;
    if (axiosRes.code !== 200) {
      return new Err(
        `Error:AList api returned code ${axiosRes.code} when fetching file ${p}`,
      );
    }
    const url = `${path_join(config.proxy.rootUrl, "d", p)}?sign=${
      axiosRes.data.sign
    }`;
    return new Ok(url);
  }

  return { init, readDir, fetchFile };
}
