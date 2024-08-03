/* v8 ignore start */

import { register, inject } from "../src/index";

@register()
class EmailService {
  emailKey: string;

  constructor() {
    this.emailKey = "email-key";
  }
}

@register(["analytics-key"])
class AnalyticsService {
  analyticsKey: string;

  constructor(analyticsKey) {
    this.analyticsKey = analyticsKey;
  }
}

@register()
export class PushNotificationService {
  pushNotificationKey: string;

  constructor() {
    this.pushNotificationKey = "push-notification-key";
  }
}

export class MyApp {
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

new MyApp().run();
