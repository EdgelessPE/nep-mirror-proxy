import { Config } from "@/config/type";

export type Locale = "zh-CN" | "en-US" | "Multi";
export type ServiceKeys = "HELLO" | "EPT_TOOLCHAIN" | "PKG_SOFTWARE";

export interface MirrorHello {
  name: string;
  locale: Locale;
  description: string;
  maintainer: string;
  protocol: "1.0.0";
  // 服务接口的根 URL，不是存储的
  root_url: string;
  property: {
    deploy_region: Locale;
    proxy_storage: true;
    upload_bandwidth: number;
    sync_interval: number;
  };
  service: {
    key: ServiceKeys;
    // 注意，配置中的 path 代表存储上存放改服务类型文件的路径
    // 而服务器返回的 path 代表服务 API 的相对/绝对路径
    path: string;
  }[];
}

export interface MirrorEptToolchain {
  update: Config["update"];
  releases: MirrorEptToolchainRelease[];
}

export interface MirrorEptToolchainRelease {
  name: string;
  version: string;
  url: string;
  size: number;
  timestamp: number;
  integrity?: string;
}

export interface MirrorPkgSoftware {
  timestamp: number;
  url_template: string;
  tree: Record<
    string,
    {
      name: string;
      releases: MirrorPkgSoftwareRelease[];
    }[]
  >;
}

export interface MirrorPkgSoftwareRelease {
  file_name: string;
  size: number;
  timestamp: number;
  version?: string;
}
