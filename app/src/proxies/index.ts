import { ControllerCtx, IProxyController, ProxyRegistry } from "./type";
import { AListControllerFactory } from "./controllers/AList";
import { Err, Ok, Result } from "ts-results";
import { config } from "@/config";

const REGISTRY: ProxyRegistry[] = [
  {
    key: "AList",
    controllerFactory: AListControllerFactory,
  },
];

export async function createController(
  basePath: string,
): Promise<Result<Omit<IProxyController, "init">, string>> {
  const key = config.proxy.typeKey;
  const node = REGISTRY.find((n) => n.key === key);
  const ctx: ControllerCtx = {
    rootUrl: config.proxy.rootUrl,
    basePath,
  };
  if (node) {
    const controller = node.controllerFactory(ctx);
    await controller.init();
    return new Ok(controller);
  } else {
    const availableKeys = REGISTRY.map((n) => n.key).join(", ");
    return new Err(
      `Error:Can't find proxy controller for '${key}', available keys: ${availableKeys}`,
    );
  }
}
