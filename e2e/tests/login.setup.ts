import { test } from "@fixtures";
import { STORAGE_STATE } from "../../playwright.config";
import { COMMON_TEXTS } from "../constants/texts";

test.describe("Login page", () => {
  test("should login with the correct credentials", async ({
    page,
    loginPage,
  }) => {
    await page.goto("/");
    await loginPage.loginAndVerifyUser({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
      username: COMMON_TEXTS.defaultUserName,
    });
    await page.context().storageState({ path: STORAGE_STATE });
  });
});
