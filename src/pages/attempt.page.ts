import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * AttemptPage: The distraction-free exam & practice test runner.
 * Handles questions, answer options, navigation, and submission.
 */
export class AttemptPage extends BasePage {
  // Question Locators
  readonly questionHeading: Locator;
  readonly questionText: Locator;
  readonly optionLabels: Locator;

  // Controls & Navigation
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly flagButton: Locator;
  readonly finishButton: Locator;

  // Confirmation Modal
  readonly confirmModal: Locator;
  readonly modalSubmitButton: Locator;
  readonly modalCancelButton: Locator;

  // Question Navigator Grid (sidebar)
  readonly questionNavGrid: Locator;

  constructor(page: Page) {
    super(page);

    // Question content
    this.questionHeading = page.locator('.exam-question-heading');
    this.questionText = page.locator('h2.question-text');
    this.optionLabels = page.locator('label.answer-option');

    // Action buttons
    this.nextButton = page.getByRole('button', { name: /next question|next/i });
    this.prevButton = page.getByRole('button', { name: /previous/i });
    this.flagButton = page.getByRole('button', { name: /flag for review|flag/i });
    this.finishButton = page.getByRole('button', { name: /finish (practice|exam|session)/i }).first();

    // Submission confirmation dialog
    this.confirmModal = page.getByRole('dialog');
    this.modalSubmitButton = page.getByRole('button', { name: /submit and see results|submit|confirm/i });
    this.modalCancelButton = page.getByRole('button', { name: /keep reviewing|cancel/i });

    // Question navigation map
    this.questionNavGrid = page.locator('.question-navigator, .exam-sidebar, nav');
  }

  /**
   * Select an option by its zero-based index (0 = A, 1 = B, etc.)
   */
  async selectOptionByIndex(index: number = 0) {
    await this.optionLabels.nth(index).click();
  }

  /**
   * Click Next to move to the subsequent question
   */
  async goToNextQuestion() {
    await this.nextButton.click();
  }

  /**
   * Open the finish confirmation modal and submit the exam
   */
  async finishAndSubmit() {
    await this.finishButton.click();
    await this.confirmModal.waitFor({ state: 'visible' });
    await this.modalSubmitButton.click();
    await this.page.waitForURL(/\/attempts\/.*\/results/);
  }
}
