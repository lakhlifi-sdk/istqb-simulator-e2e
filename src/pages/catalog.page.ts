import { Page, Locator } from '@playwright/test';
import { StandardLayoutPage } from './standard-layout.page';

export class CatalogPage extends StandardLayoutPage {
  
  // Page heading
  readonly pageHeading: Locator;
  
  // Certifications grid cards
  readonly certificationCards: Locator;

  constructor(page: Page) {
    super(page);

    // ✅ getByRole heading
    this.pageHeading = page.getByRole('heading', { name: /ISTQB mock exams/i });

    // ✅ Each certification is an <article> element
    this.certificationCards = page.locator('article.uw-job-card');
  }

  /**
   * Get the "Start practicing" link for a specific certification by its name
   */
  getStartPracticingLink(certificationName: string | RegExp): Locator {
    // 1. Find the article card containing the certification name
    // 2. Within that card, find the "Start practicing" link
    return this.certificationCards
      .filter({ has: this.page.getByRole('link', { name: certificationName }) })
      .getByRole('link', { name: /start practicing/i });
  }
}