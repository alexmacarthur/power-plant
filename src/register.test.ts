import { describe, expect, it, afterEach } from "vitest";
import { register, registry } from "./register";

describe("register()", () => {
  afterEach(() => {
    registry.clear();
  });

  it("registers a class with the registry", () => {
    class TestClass {}

    register()(TestClass);

    expect(registry.has(TestClass)).toBe(true);
    expect(registry.size).toBe(1);
  });

  it("registers a class with the registry with arguments", () => {
    class TestClass {}

    register(["arg1", "arg2"])(TestClass);

    expect(registry.size).toBe(1);
    expect(registry.get(TestClass)).toEqual(["arg1", "arg2"]);
  });
});
