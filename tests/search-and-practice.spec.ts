import { test, expect } from '../src/fixtures/test.fixture';


import {} from '../src/fixtures/test.fixture';

test.describe('Search and Practice Flow', () => {


  // TEST 1: Focused on Search
  test('should search certifications from hero bar and display results', async ({ page ,homePage, catalogPage }) => {
    await homePage.navigateTo();
    await homePage.waitForPageReady();

    await homePage.searchFromHero('Foundation');

    await expect(page).toHaveURL(/\/certifications/);
    await expect(catalogPage.pageHeading).toBeVisible();
    await expect(catalogPage.getStartPracticingLink(/Foundation/i)).toBeVisible();
  });

  // TEST 2: Focused on Catalog to Details navigation
  test('should navigate to certification details from catalog', async ({ page, catalogPage, catalogDetailsPage }) => {
    await page.goto('/certifications');
    await catalogPage.getStartPracticingLink(/Foundation/i).click();

    await expect(page).toHaveURL(/\/certifications\/.+/);
    await expect(catalogDetailsPage.startPracticingButton).toBeVisible();
  });

  // TEST 3: Focused on launching the Practice/Exam Attempt
  test('should launch practice attempt session from certification details', async ({ page ,homePage, catalogPage, catalogDetailsPage, attemptPage }) => {
    await homePage.navigateTo();
    await homePage.waitForPageReady();

    await homePage.searchFromHero('Foundation');
    await catalogPage.getStartPracticingLink(/Foundation/i).click();

    await expect(catalogDetailsPage.startPracticingButton).toBeVisible();
    await catalogDetailsPage.startPracticingButton.click();

    await expect(page).toHaveURL(/\/attempts\/.+/);
    await expect(attemptPage.nextButton).toBeVisible();
  });

});
