import { describe, expect, it } from "vitest";
import { registry } from "./register";
import { inject, container } from "./container";

function makeFakeContext(): [DecoratorContext, any] {
  const fakeThis = {};
  const context = {
    addInitializer: function (cb) {
      cb.bind(fakeThis)();
    },
    name: "test",
  } as DecoratorContext;

  return [context, fakeThis];
}

describe("inject()", () => {
  it("it creates instance of class", () => {
    class TestClass {}

    registry.set(TestClass, []);
    const func = inject(TestClass);
    const [context, fakeThis] = makeFakeContext();

    func(undefined, context);

    expect(container.has(TestClass)).toBe(true);
    expect(container.size).toBe(1);
    expect(fakeThis["test"]).toBeInstanceOf(TestClass);
  });

  it("it creates instance of class with arguments", () => {
    class TestClass {
      arg1: string;
      arg2: string;

      constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
      }
    }

    registry.set(TestClass, ["arg1", "arg2"]);
    const func = inject(TestClass);
    const [context, fakeThis] = makeFakeContext();

    func(undefined, context);

    expect(container.has(TestClass)).toBe(true);
    expect(container.size).toBe(1);
    expect(fakeThis["test"]).toBeInstanceOf(TestClass);
    expect(fakeThis["test"].arg1).toBe("arg1");
    expect(fakeThis["test"].arg2).toBe("arg2");
  });

  it("does not create instance of class if already exists", () => {
    class TestClass {
      version: number = 0;

      constructor() {}
    }

    const firstInstance = new TestClass();
    firstInstance.version = 1;

    registry.set(TestClass, []);
    container.set(TestClass, firstInstance);

    const func = inject(TestClass);
    const [context, fakeThis] = makeFakeContext();

    func(undefined, context);

    expect(container.has(TestClass)).toBe(true);
    expect((container.get(TestClass) as any).version).toBe(1);
    expect(container.size).toBe(1);
    expect(fakeThis["test"]).toBeInstanceOf(TestClass);
  });

  it("throws an error if the class is not registered", () => {
    class TestClass {}

    const func = inject(TestClass);
    const [context] = makeFakeContext();

    expect(() => func(undefined, context)).toThrowError(
      `The class ${TestClass.name} is not registered.`,
    );
  });
});
