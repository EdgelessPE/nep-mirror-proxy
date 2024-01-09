import { ControllerCtx, IProxyController, ProxyRegistry } from "./type";
import { AListControllerFactory } from "./controllers/AList";
import { Err, Ok, Result } from "ts-results";

const REGISTRY: ProxyRegistry[] = [
  {
    key: "AList",
    controllerFactory: AListControllerFactory,
  },
];

export async function createController(
  key: string,
  ctx: ControllerCtx,
): Promise<Result<Omit<IProxyController, "init">, string>> {
  const node = REGISTRY.find((n) => n.key === key);

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
