import { afterEach } from "vitest";
import { registry } from "./src/register";
import { container } from "./src/container";

afterEach(() => {
  registry.clear();
  container.clear();
});
