import { test, expect } from '../src/fixtures/test.fixture';
import { loginData } from '../src/data';

test.describe('Login Page', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ─── Page Structure & UI Elements ─────────────────────────────────────────

  test('should display the login page heading', async ({ loginPage }) => {
    await expect(loginPage.pageHeading).toBeVisible();
  });

  test('should display email and password fields, password toggle, and submit button', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordToggle).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('should toggle password visibility when clicking show password button', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await loginPage.passwordToggle.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('should display a link to create an account', async ({ loginPage }) => {
    await expect(loginPage.registerLink).toBeVisible();
  });

  test('should display a link to continue as a guest', async ({ loginPage }) => {
    await expect(loginPage.continueAsGuestLink).toBeVisible();
  });

  // ─── Form Client-Side Validation ──────────────────────────────────────────

  test('should enforce required email via HTML5 validation when submitting empty form', async ({ loginPage }) => {
    await loginPage.submitButton.click();
    const isValid = await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('should enforce email format via HTML5 validation for invalid email', async ({ loginPage }) => {
    await loginPage.emailInput.fill(loginData.invalidFormat.email);
    await loginPage.passwordInput.fill(loginData.validUser.password);
    await loginPage.submitButton.click();
    const isValid = await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  // ─── Authentication Flows (Happy & Unhappy Paths) ─────────────────────────

  test('should show an error when attempting to log in with invalid credentials (unhappy path)', async ({ page, loginPage }) => {
    await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);

    // Verify user remains on the login page and an error is displayed
    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should successfully log in and redirect with valid credentials (happy path)', async ({ page, loginPage }) => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);

    // Verify successful login redirects away from /login
    await expect(page).not.toHaveURL(/\/login/);
  });

  // ─── Navigation Links ─────────────────────────────────────────────────────

  test('should navigate to the register page from create account link', async ({ page, loginPage }) => {
    await loginPage.registerLink.click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('should navigate to certifications from continue as a guest link', async ({ page, loginPage }) => {
    await loginPage.continueAsGuestLink.click();
    await expect(page).toHaveURL(/\/certifications/);
  });

});
