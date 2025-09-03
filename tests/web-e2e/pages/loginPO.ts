import { Page } from "@playwright/test";
import { locators } from "./locators";
import { CommonPO } from "../utils/common-utils";

export class LoginPO {
  page: Page;
  commonPage: CommonPO;
  constructor(page: Page) {
    this.page = page;
    this.commonPage = new CommonPO(this.page);
  }

  async login(url: string, username: string, password: string) {
    await this.page.goto(url);
    await this.page.locator(locators.username_xpath).fill(username);
    await this.page.locator(locators.pass_xpath).fill(password);
    await this.commonPage.clickOnElement({
      xpath: locators.loginButton_xpath,
      options: { delay: 5000 },
    });
  }

  async loginValidation() {
    const headerVisibility = await this.commonPage.verifyVisibility(
      locators.dashboardHeader_xpath
    );
    console.log(`headerVisibility : ${headerVisibility}`);

    const upgradeButtonVisibility = await this.commonPage.verifyVisibility(
      locators.upgradeButton_xpath
    );
    console.log(`upgradeButtonVisibility : ${upgradeButtonVisibility}`);

    return headerVisibility;
  }
}
