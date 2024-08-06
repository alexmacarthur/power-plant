/* v8 ignore start */

import { inject } from "../src/index";
import {
  AnalyticsService,
  EmailService,
  PushNotificationService,
} from "./services";

export class OtherApp {
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
