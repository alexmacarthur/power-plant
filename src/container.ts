import { registry } from "./register";
import { Constructor, InstanceType } from "./types";

export const container = new Map<Constructor, InstanceType<Constructor>>();

export function inject(clazz: Constructor) {
  return function (_value: undefined, context: DecoratorContext) {
    context.addInitializer(function () {
      let instance = container.get(clazz);

      if (!registry.has(clazz)) {
        throw new Error(`The class ${clazz.name} is not registered.`);
      }

      if (!instance) {
        instance = Reflect.construct(clazz, registry.get(clazz));
        container.set(clazz, instance);
      }

      this[context.name] = instance;
    });
  };
}
