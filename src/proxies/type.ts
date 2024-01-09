import { Result } from "ts-results";

export interface ProxyRegistry {
  key: string;
  controllerFactory: (ctx: ControllerCtx) => IProxyController;
}

export interface FileNode {
  // 文件/目录在该种代理介质中的唯一路径，依赖于这个路径进行目录读取、文件获取操作
  path: string;
  name: string;
  size: number;
  timestamp: number;
  isDir: boolean;
}

export interface IProxyController {
  init: () => Promise<Result<void, string>>;
  readDir: (path: string) => Promise<Result<FileNode[], string>>;
  fetchFile: (path: string) => Promise<Result<string, string>>;
}

export interface ControllerCtx {
  // 代理存储管理系统的站点 URL
  rootUrl: string;
  // Nep 文件存放起始路径
  basePath: string;
}
