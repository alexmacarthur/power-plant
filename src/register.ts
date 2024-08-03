import { Constructor } from "./types";

export const registry = new Map<Constructor, Array<any>>();

export function register(args: Array<any> = []) {
  return (clazz: Constructor, context: DecoratorContext) => {
    if (context.kind !== "class") {
      throw new Error("The register() can only be used on classes.");
    }

    registry.set(clazz, args);
  };
}

export function clear() {
  registry.clear();
}
