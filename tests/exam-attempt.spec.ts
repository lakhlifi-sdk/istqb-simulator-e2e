import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Exam Attempt & Pass Flow', () => {

  test('should launch a practice attempt, answer questions, and view results', async ({
    page,
    homePage,
    catalogPage,
    catalogDetailsPage,
    attemptPage,
    resultsPage,
  }) => {
    // 1. Navigate from home and search Foundation certification
    await homePage.navigateTo();
    await homePage.waitForPageReady();
    await homePage.searchFromHero('Foundation');

    // 2. Open certification details
    await catalogPage.getStartPracticingLink(/Foundation/i).click();
    await expect(catalogDetailsPage.startPracticingButton).toBeVisible();

    // 3. Start practice session
    await catalogDetailsPage.startPracticingButton.click();
    await expect(page).toHaveURL(/\/attempts\/[a-f0-9-]+$/);

    // 4. Verify question interface is visible
    await expect(attemptPage.questionText).toBeVisible();
    await expect(attemptPage.optionLabels.first()).toBeVisible();

    // 5. Select an answer and move through questions
    await attemptPage.selectOptionByIndex(0);
    if (await attemptPage.nextButton.isVisible()) {
      await attemptPage.goToNextQuestion();
      await expect(attemptPage.questionText).toBeVisible();
      await attemptPage.selectOptionByIndex(1);
    }

    // 6. Finish and submit attempt
    await attemptPage.finishAndSubmit();

    // 7. Verify results page
    await expect(page).toHaveURL(/\/attempts\/.*\/results/);
    await expect(resultsPage.scoreBreakdownSection).toBeVisible();
    await expect(resultsPage.resultsEyebrow).toBeVisible();
  });

  test('should complete exam and display passed status upon reaching pass score', async ({
    page,
    catalogDetailsPage,
    attemptPage,
    resultsPage,
  }) => {
    // Mock the attempt completion to represent a passing score (>= 26 / 40 pts, 65%)
    await page.route(/\/api\/attempts\/[a-f0-9-]+(\/submit)?$/, async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      if (json.status === 'COMPLETED') {
        json.passed = true;
        json.score = 32;
        json.passingPoints = 26;
        json.totalPoints = 40;
      }
      await route.fulfill({ json });
    });

    // 1. Navigate directly to CTFL certification details
    await page.goto('/certifications/ctfl');
    await page.waitForLoadState('domcontentloaded');

    // 2. Select Timed Exam mode and begin
    await catalogDetailsPage.startTimedExam();
    await expect(page).toHaveURL(/\/attempts\/[a-f0-9-]+$/);

    // 3. Answer questions in the exam
    await expect(attemptPage.optionLabels.first()).toBeVisible();
    await attemptPage.selectOptionByIndex(0);

    // 4. Submit the exam
    await attemptPage.finishAndSubmit();

    // 5. Assert the Exam Passed status and celebration headline
    await expect(page).toHaveURL(/\/attempts\/.*\/results/);
    await expect(resultsPage.passedStatusPill).toBeVisible();
    await expect(resultsPage.passedStatusPill).toHaveText(/passed/i);
    await expect(resultsPage.celebrationHeading).toBeVisible();
    await expect(resultsPage.passingTargetText).toBeVisible();
  });

});
