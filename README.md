# Power Plant

_A dependency injection framework built on native decorators._

## Why?

[Native class decorators](https://github.com/tc39/proposal-decorators) will soon be available in ECMAScript, providing a simple API for enhancing classes, their fields, methods, and accessors.

Amongst the many use cases is container-managed dependency injection, an approach used by frameworks such as Laravel, Spring Boot, and Nest.js. This library offers a similar feature using native JavaScript decorators.

## Installation

`npm install @alexmacarthur/power-plant`

## Usage

There are two decorators that must be used in order to leverage this library:

### Register Classes

First, add the `@register` decorator to every class you'd like to allow to be instantiated within the container:

```ts
import { register } from "@alexmacarthur/power-plant";

@register()
class MyService {}
```

By default, each registered class will later be instantiated with no constructor parameters. If you'd like to define them, however, you can provide an array of them in the `@register()` call:

```ts
@register(["arg1", "arg2", "arg3"])
class MyService {}
```

When the class is later instantiated, that array will be provided as distinct parameters:

```ts
new class MyService('arg1', 'arg2', 'arg3');
```

If, for whatever reason, you'd like to add or remove registered classes manually, you can import the `registry` Map directly:

```ts
import { registry } from "@alexmacarthur/power-plant";

// Register with no constructor parameters.
registry.set(MyService, []);

// Register with constructor parameters.
registry.set(MyService, ["arg1", "arg2", "arg3"]);

// Unregister classes.
registry.delete(MyService);
```

### Injecting Classes

The `@inject()` decorator is needed to construct and assign class instances to class fields.

```ts
class MyClass {
  @inject(MyService);
  myService: MyService;

  constructor() {
    console.log(this.myService); // instance of MyService
  }
}
```

If needed you can manipulate the container of instantiated classes directly:

```ts
import { container } from "@alexmacarthur/power-plant";

// Set instances.
const myServiceInstance = new MyService();
container.set(MyService, myServiceInstance);

// Remove instances.
container.delete(MyService);
```

## FAQ

### What makes this special?

This library is built entirely on the offiial ECMAScript decorators proposal. It differs from most other libraries out there, which are built on a [legacy decorator specification](https://github.com/tc39/proposal-decorators?tab=readme-ov-file#comparison-with-babel-legacy-decorators).

### In what runtimes is this supported?

Currently, Deno appears to be the only major runtime that supports native ECMAScript decorators, and even [it has a bug](https://github.com/denoland/deno/issues/22253) that'll prevent this library from working correctly.

So, in order to use this, you'll need to compile your code with [TypeScript > v5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators) or with [Babel's @babel/plugin-proposal-decorators](https://babeljs.io/docs/babel-plugin-proposal-decorators) plugin.

### Can I use this across modules in the same application?

Yes. The same registry and container are used throughout an application, so you can safely inject dependencies without worring about classes being unnecessarily instantiated multiple times. Here's a more fleshed out, contrived example:

```typescript
// my-dependency-class.ts

export class MyDependencyClass {}
```

```typescript
// my-class.ts

import { inject } from "@alexmacarthur/power-plant";

export class MyClass {
  @inject(EmailService)
  emailService: EmailService;

  constructor() {}

  run() {}
}
```

```typescript
// my-other-class.ts

import { inject } from "@alexmacarthur/power-plant";

export class MyOtherClass {
  @inject(EmailService)
  emailService: EmailService;

  constructor() {}

  run() {}
}
```

```typescript
// index.ts

import { register } from "@alexmacarthur/power-plant";
import { MyDependencyClass } from "./my-dependency-class";
import { MyClass } from "./my-class";
import { MyOtherClass } from "./my-other-class";

register(MyDependencyClass);

new MyClass().run();
new MyOtherClass().run();

// MyDependencyClass was instantiated _once_.
```

## Feedback or Contributions?

Make an issue or [find me on X](https://twitter.com/amacarthur).
