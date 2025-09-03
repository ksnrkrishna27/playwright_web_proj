import { Page } from "@playwright/test";

interface Parameters {
  xpath: string;
  nth?: number;
  options?: {
    delay?: number;
    timeout?: number;
    clickCount?: number;
    force?: Boolean;
  };
}

export class CommonPO {
  page: Page;
  clickCount: number;
  verifyCount: number;
  constructor(page: Page) {
    this.page = page;
    this.clickCount = 0;
    this.verifyCount = 0;
  }

  async waitForElement(
    xpath: string,
    nth?: number,
    page = this.page,
    timeout = 30000
  ) {
    await page.waitForLoadState("domcontentloaded");
    let element: any;
    if (nth || nth === 0) {
      element = page.locator(xpath).nth(nth);
    } else {
      element = page.locator(xpath);
    }

    await element.waitFor({ state: "visible", timeout: timeout });

    return element;
  }

  async verifyVisibility(
    xpath: string,
    nth?: number,
    page = this.page,
    timeout = 30000
  ) {
    const locator = await this.waitForElement(xpath, nth, page, timeout);

    const locatorVisibility = await locator.isVisible();

    await page.screenshot({
      path: `./artifacts/Screenshots/verifyVisibilitySS/verifyVisibilitySS-${this
        .verifyCount++}.png`,
    });

    return locatorVisibility;
  }

  async clickOnElement(parameter: Parameters, page = this.page) {
    const { xpath, nth, options } = parameter;
    const waitLocator = await this.waitForElement(xpath, nth, page);

    await page.locator(xpath).screenshot({
      path: `./artifacts/Screenshots/clickOnElementSS/clickOnElementSS-${this.clickCount}.png`,
    });

    await waitLocator.click({ ...options });
  }
}
