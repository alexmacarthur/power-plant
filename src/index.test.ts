import { expect, it } from "vitest";
import { container, inject, register, registry } from "./index";

it("exposes correct imports", () => {
  expect(register).toBeDefined();
  expect(inject).toBeDefined();
  expect(registry).toBeDefined();
  expect(container).toBeDefined();
});
