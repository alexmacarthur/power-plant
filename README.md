# Power Plant

_A dependency injection framework built on native decorators._

## Why?

[Native class decorators](https://github.com/tc39/proposal-decorators) will soon be available in ECMAScript, providing a simple API for enhancing classes, their fields, methods, and accessors.

Amongst the many use cases is container-managed dependency injection, an approach used by frameworks such as Laravel, Spring Boot, and Nest.js. This library offers a similar feature using native JavaScript decorators.

## Example

```typescript
import { register, inject } from "../src/index";

@register()
class EmailService {
  emailKey: string;

  constructor() {
    this.emailKey = "email-key";
  }
}

export class MyApp {
  @inject(EmailService)
  emailService;

  constructor() {}

  run() {
    console.log(this.emailService.emailKey);
    // 'email key'
  }
}
```
