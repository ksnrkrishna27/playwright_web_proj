import { expect, test } from "@playwright/test";
import { LoginPO } from "../pages/loginPO";
import { getTestData } from "../test-data/config";

test.describe("test-case-01", async () => {
  const { urls, loginPage } = getTestData();
  test("Login Test", async ({ page }) => {
    const loginPO = new LoginPO(page);

    await test.step("Validating Login Functionality", async () => {
      await loginPO.login(
        urls.orangeHRMUrl,
        loginPage.userName01,
        loginPage.password01
      );
      const headerVisibility = await loginPO.loginValidation();
      expect(headerVisibility).toBeTruthy();
    });
  });
});
