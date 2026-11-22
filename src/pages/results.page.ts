import { Page, Locator } from '@playwright/test';
import { StandardLayoutPage } from './standard-layout.page';

/**
 * ResultsPage: Detailed score breakdown, pass/fail status, and chapter performance
 * after an exam or practice session is submitted.
 */
export class ResultsPage extends StandardLayoutPage {
  // Pass / Fail Status Badges
  readonly passedStatusPill: Locator;
  readonly failedStatusPill: Locator;

  // Headings
  readonly resultsEyebrow: Locator;
  readonly celebrationHeading: Locator;
  readonly encouragementHeading: Locator;

  // Score metrics
  readonly scoreBreakdownSection: Locator;
  readonly passingTargetText: Locator;

  // Action links
  readonly backToLearningLink: Locator;

  constructor(page: Page) {
    super(page);

    this.passedStatusPill = page.locator('.results-status-pill.passed, .results-status-pill:has-text("Passed")');
    this.failedStatusPill = page.locator('.results-status-pill:has-text("Below passing")');

    this.resultsEyebrow = page.getByText(/exam results|practice results/i);
    this.celebrationHeading = page.getByRole('heading', { name: /look what you can do/i });
    this.encouragementHeading = page.getByRole('heading', { name: /progress starts here|another step forward/i });

    this.scoreBreakdownSection = page.locator('main');
    this.passingTargetText = page.getByText(/passing target/i);

    this.backToLearningLink = page.getByRole('link', { name: /back to my learning/i });
  }
}
