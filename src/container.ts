import { registry } from "./register";
import { Constructor, InstanceType } from "./types";

export const container = new Map<Constructor, InstanceType<Constructor>>();

export function inject(clazz: Constructor) {
  return function (_value: undefined, context: DecoratorContext) {
    context.addInitializer(function () {
      let instance = container.get(clazz);
      let instanceArgs = registry.get(clazz) || [];

      if (!instance) {
        instance = Reflect.construct(clazz, instanceArgs);
        container.set(clazz, instance);
      }

      this[context.name] = instance;
    });
  };
}
