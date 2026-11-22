import { test, expect } from '../src/fixtures/test.fixture';
import { registerData } from '../src/data';

test.describe('Register Page', () => {

  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  // ─── Page Structure & UI Elements ─────────────────────────────────────────

  test('should display the register page header and subtitle', async ({ registerPage }) => {
    await expect(registerPage.pageHeading).toBeVisible();
    await expect(registerPage.pageEyebrow).toHaveText(/join certivo/i);
    await expect(registerPage.pageSubtitle).toBeVisible();
  });

  test('should display all registration form fields and submit button', async ({ registerPage }) => {
    await expect(registerPage.nameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.passwordToggle).toBeVisible();
    await expect(registerPage.passwordHint).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  test('should toggle password visibility when clicking show password button', async ({ registerPage }) => {
    await expect(registerPage.passwordInput).toHaveAttribute('type', 'password');
    await registerPage.passwordToggle.click();
    await expect(registerPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('should display navigation links to log in and continue as guest', async ({ registerPage }) => {
    await expect(registerPage.loginLink).toBeVisible();
    await expect(registerPage.continueAsGuestLink).toBeVisible();
  });

  // ─── Form Client-Side Validation ──────────────────────────────────────────

  test('should enforce required name via HTML5 validation when submitting empty form', async ({ registerPage }) => {
    await registerPage.submitButton.click();
    const isNameValid = await registerPage.nameInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isNameValid).toBe(false);
  });

  test('should enforce email format via HTML5 validation for invalid email', async ({ registerPage }) => {
    await registerPage.nameInput.fill(registerData.validUser.name);
    await registerPage.emailInput.fill(registerData.invalidFormat.email);
    await registerPage.passwordInput.fill(registerData.validUser.password);
    await registerPage.submitButton.click();

    const isEmailValid = await registerPage.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isEmailValid).toBe(false);
  });

  test('should enforce password minimum length requirement (12 chars)', async ({ registerPage }) => {
    await registerPage.nameInput.fill(registerData.validUser.name);
    await registerPage.emailInput.fill(registerData.validUser.email);
    await registerPage.passwordInput.fill(registerData.shortPassword.password);
    await registerPage.submitButton.click();

    const isPasswordValid = await registerPage.passwordInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isPasswordValid).toBe(false);
  });

  // ─── Navigation Links ─────────────────────────────────────────────────────

  test('should navigate to the login page from "Log in" link', async ({ page, registerPage }) => {
    await registerPage.loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('should navigate to certifications from "Continue as a guest" link', async ({ page, registerPage }) => {
    await registerPage.continueAsGuestLink.click();
    await expect(page).toHaveURL(/\/certifications/);
  });

});
