import { Page, Locator } from '@playwright/test';
import { StandardLayoutPage } from './standard-layout.page';

export class HomePage extends StandardLayoutPage {
  
  // Hero Search Form (the section under the main heading)
  readonly heroSearchInput: Locator;
  readonly heroSearchButton: Locator;

  constructor(page: Page) {
    super(page);

    // ✅ 1st choice: getByRole + name matches aria-label on the input
    this.heroSearchInput = page.getByRole('searchbox', { name: /search syllabi/i });

    // ✅ 1st choice: getByRole + aria-label="Search certifications"
    this.heroSearchButton = page.getByRole('button', { name: /search certifications/i });
  }

  /**
   * Search a certification from the hero search bar
   * and submit (navigates to /certifications?q=...)
   */
  async searchFromHero(term: string) {
    await this.heroSearchInput.fill(term);
    await this.heroSearchButton.click();
  }
  
  
}