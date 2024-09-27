import { MirrorHello } from "@/type";

export type Config = MirrorHello & {
  proxy: {
    typeKey: string;
    rootUrl: string;
  };
  update: {
    wild_gaps: string[];
  };
  dir: {
    meta_cache: string;
  };
};
