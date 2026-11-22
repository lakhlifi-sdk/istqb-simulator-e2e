import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CatalogPage } from '../pages/catalog.page';
import { CatalogDetailsPage } from '../pages/catalog-details.page';
import { AttemptPage } from '../pages/attempt.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ResultsPage } from '../pages/results.page';

// Declare the shape of our custom fixtures
type AppFixtures = {
  homePage: HomePage;
  catalogPage: CatalogPage;
  catalogDetailsPage: CatalogDetailsPage;
  attemptPage: AttemptPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  resultsPage: ResultsPage;
};

// Extend the base test with our Page Objects injected automatically
export const test = baseTest.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  catalogDetailsPage: async ({ page }, use) => {
    await use(new CatalogDetailsPage(page));
  },

  attemptPage: async ({ page }, use) => {
    await use(new AttemptPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },
});

// Re-export expect so tests only need one import
export { expect } from '@playwright/test';
