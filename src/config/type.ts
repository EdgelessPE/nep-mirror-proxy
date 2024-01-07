import { MirrorHello } from "../type";

export type Config = MirrorHello & {
  proxy: {
    typeKey: string;
    rootUrl: string;
  };
};
