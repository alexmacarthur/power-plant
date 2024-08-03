import { describe, expect, it } from "vitest";
import { clear, register, registry } from "./register";

describe("register()", () => {
  it("registers a class with the registry", () => {
    class TestClass {}
    const context = { kind: "class" } as ClassDecoratorContext;

    register()(TestClass, context);

    expect(registry.has(TestClass)).toBe(true);
    expect(registry.size).toBe(1);
  });

  it("registers a class with the registry with arguments", () => {
    class TestClass {}
    const context = { kind: "class" } as DecoratorContext;

    register(["arg1", "arg2"])(TestClass, context);

    expect(registry.size).toBe(1);
    expect(registry.get(TestClass)).toEqual(["arg1", "arg2"]);
  });

  it("throws an error if the decorator is not used on a class", () => {
    class TestClass {}
    const context = { kind: "method" } as DecoratorContext;

    expect(() => register()(TestClass, context)).toThrowError(
      "The register() can only be used on classes.",
    );
  });
});

describe("clear()", () => {
  it("clears the registry", () => {
    registry.set(class {}, []);

    expect(registry.size).toBe(1);

    clear();

    expect(registry.size).toBe(0);
  });
});
