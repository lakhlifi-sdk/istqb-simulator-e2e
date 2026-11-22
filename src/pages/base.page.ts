import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string = process.env.BASE_URL || 'http://localhost:1111/'): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageReady() {
    await this.page.waitForLoadState("domcontentloaded");
  }
  getCurrentUrl(): string {
    return this.page.url();
  }
}
