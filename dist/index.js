const registry = new Map();
export const container = new Map();
export function register(args = []) {
    return function (clazz) {
        registry.set(clazz, args);
    };
}
export function inject(clazz) {
    return function (_value, context) {
        context.addInitializer(function () {
            let instance = container.get(clazz);
            if (!instance) {
                instance = Reflect.construct(clazz, registry.get(clazz));
                container.set(clazz, instance);
            }
            this[context.name] = instance;
        });
    };
}
