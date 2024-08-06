import { vi, it, expect } from "vitest";
import { container, inject } from "./index";

class EmailService {
  send(message: string) {
    console.log("Sending email:", message);
  }
}

it("Can mock instances.", () => {
  class MyTestApp {
    @inject(EmailService)
    emailService;

    go() {
      this.emailService.send("my message!");
    }
  }

  const mockEmailServiceInstance = {
    send: vi.fn(),
  };

  container.set(EmailService, mockEmailServiceInstance);

  new MyTestApp().go();

  expect(mockEmailServiceInstance.send).toHaveBeenCalledTimes(1);
  expect(mockEmailServiceInstance.send).toHaveBeenCalledWith("my message!");
});
