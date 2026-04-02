import { Page, expect } from "@playwright/test";

import { LOGIN_SELECTORS } from "@selectors";
import { LOGIN_UI_TEXTS } from "@texts";

interface LoginPageProps {
  email: string;
  password: string;
  username: string;
}

export default class LoginPage {
  constructor(private page: Page) {}

  loginAndVerifyUser = async ({
    email,
    password,
    username,
  }: LoginPageProps): Promise<void> => {
    await this.page.getByTestId(LOGIN_SELECTORS.emailField).fill(email);
    await this.page.getByTestId(LOGIN_SELECTORS.passwordField).fill(password);
    await this.page.getByTestId(LOGIN_SELECTORS.loginButton).click();

    await this.page
      .getByTestId(LOGIN_SELECTORS.floatingActionMenuContainer)
      .getByRole("button", { name: LOGIN_UI_TEXTS.avatarMenuButtonName })
      .hover();
    await expect(
      this.page.getByTestId(LOGIN_SELECTORS.profileExpandMenuButton),
    ).toContainText(username);
  };
}
