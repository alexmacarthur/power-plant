import { Constructor } from "./types";

export const registry = new Map<Constructor, Array<any>>();

export function register(args = []) {
  return (clazz: Constructor) => {
    registry.set(clazz, args);
  };
}

export function clear() {
  registry.clear();
}
