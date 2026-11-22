import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * StandardLayoutPage: Represents pages that include the top Navbar and bottom Footer.
 * (Home, Certifications, Results, History, Login).
 */
export abstract class StandardLayoutPage extends BasePage {
  // Navbar Locators
  readonly brandLogo: Locator;
  readonly navCertificationsLink: Locator;

  // Footer & Copyright Locators
  readonly footer: Locator;
  readonly footerTagline: Locator;
  readonly copyrightText: Locator;
  readonly legalDisclaimer: Locator;

  constructor(page: Page) {
    super(page);

    // Navbar
    this.brandLogo = page.getByRole('link', { name: /certivo home/i });
    this.navCertificationsLink = page.getByRole('link', { name: /certifications/i });

    // Footer
    this.footer = page.locator('footer.site-footer');
    this.footerTagline = page.getByText(/Independent learning\. Real progress\./i);
    this.copyrightText = page.getByText(/© \d{4} Certivo/i);
    this.legalDisclaimer = page.getByText(/Not affiliated with or endorsed by ISTQB/i);
  }
}