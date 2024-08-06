/* v8 ignore start */

import { inject } from "../src/index";
import {
  EmailService,
  AnalyticsService,
  PushNotificationService,
} from "./services";
import { OtherApp } from "./other";

export class MyClass {
  @inject(EmailService)
  emailService;

  @inject(AnalyticsService)
  analyticsService;

  @inject(PushNotificationService)
  pushNotificationService;

  constructor() {}

  run() {
    console.log(this.emailService.emailKey);
    console.log(this.analyticsService.analyticsKey);
    console.log(this.pushNotificationService.pushNotificationKey);
  }
}

new MyClass().run();
new OtherApp().run();
