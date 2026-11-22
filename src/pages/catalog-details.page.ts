import { Locator, Page } from "@playwright/test";
import { StandardLayoutPage } from "./standard-layout.page";

export class CatalogDetailsPage extends StandardLayoutPage {
  // Mode selection tabs
  readonly practiceTab: Locator;
  readonly timedExamTab: Locator;

  // Session start buttons
  readonly startPracticingButton: Locator;
  readonly beginTimedExamButton: Locator;

  constructor(page: Page) {
    super(page);

    this.practiceTab = page.getByRole('button', { name: 'Practice', exact: true });
    this.timedExamTab = page.getByRole('button', { name: 'Timed Exam', exact: true });

    this.startPracticingButton = page.getByRole('button', { name: /start practicing/i });
    this.beginTimedExamButton = page.getByRole('button', { name: /begin timed exam/i });
  }

  getStartPracticingButton(): Locator {
    return this.startPracticingButton;
  }

  async selectTimedExamMode() {
    await this.timedExamTab.click();
    await this.beginTimedExamButton.waitFor({ state: 'visible' });
  }

  async startTimedExam() {
    await this.selectTimedExamMode();
    await this.beginTimedExamButton.click();
  }
}
