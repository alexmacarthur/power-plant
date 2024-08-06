/* v8 ignore start */

import { register } from "../src/index";

@register()
export class EmailService {
  emailKey: string;

  constructor() {
    console.log("EMAIL SERVICE BEING CREATED.");
    this.emailKey = "email-key";
  }
}

@register(["analytics-key"])
export class AnalyticsService {
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
