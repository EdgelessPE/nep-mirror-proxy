import { ControllerCtx, IProxyController, ProxyRegistry } from "./type";
import { AListControllerFactory } from "./controllers/AList";
import { Err, Ok, Result } from "ts-results";

const REGISTRY: ProxyRegistry[] = [
  {
    key: "AList",
    controllerFactory: AListControllerFactory,
  },
];

export function findController(
  key: string,
  ctx: ControllerCtx,
): Result<IProxyController, string> {
  const node = REGISTRY.find((n) => n.key === key);

  if (node) {
    return new Ok(node.controllerFactory(ctx));
  } else {
    const availableKeys = REGISTRY.map((n) => n.key).join(", ");
    return new Err(
      `Error:Can't find proxy controller for '${key}', available keys: ${availableKeys}`,
    );
  }
}
