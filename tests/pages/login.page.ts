import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  private readonly selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.locator(this.selectors.username).fill(username);
    await this.page.locator(this.selectors.password).fill(password);
    await this.page.locator(this.selectors.loginButton).click();
  }
}
