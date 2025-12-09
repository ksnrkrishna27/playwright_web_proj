import { expect, test } from "@playwright/test";
import { LoginPO } from "../pages/loginPO";
import { getTestData } from "../test-data/config";
import env from "../../../configs/envLoader.ts";

test.describe("test-case-01", async () => {
  const { urls, loginPage } = getTestData();
  test("Login Test", async ({ page }) => {
    const loginPO = new LoginPO(page);

    await test.step("Validating Login Functionality", async () => {
      await loginPO.login(
        env.loginUrl,
        env.loginCreds.user1.username,
        env.loginCreds.user1.password
      );
      const headerVisibility = await loginPO.loginValidation();
      expect(headerVisibility).toBeTruthy();
    });
  });
});
