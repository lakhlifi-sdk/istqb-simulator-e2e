import { Page, Locator } from '@playwright/test';
import { StandardLayoutPage } from './standard-layout.page';

export class LoginPage extends StandardLayoutPage {
  // Page URL path
  static readonly PATH = '/login';

  // Form fields
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggle: Locator;
  readonly submitButton: Locator;

  // Feedback & alerts
  readonly errorMessage: Locator;

  // Page elements & navigation links
  readonly pageHeading: Locator;
  readonly registerLink: Locator;
  readonly continueAsGuestLink: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { level: 1, name: /log in to your account/i });

    this.emailInput = page.getByPlaceholder(/you@example\.com/i);
    this.passwordInput = page.getByPlaceholder(/your password/i);
    this.passwordToggle = page.getByRole('button', { name: /showw password|hidew password/i });
    this.submitButton = page.getByRole('button', { name: 'Log in', exact: true });

    this.errorMessage = page
      .locator('[role="alert"], .uw-alert, .error, .error-message, .alert')
      .or(page.getByText(/invalid credentials|invalid email or password|user not found|incorrect password/i));

    this.registerLink = page.locator('main').getByRole('link', { name: /create an account/i });
    this.continueAsGuestLink = page.locator('main').getByRole('link', { name: /continue as a guest/i });
  }

  /** Navigate directly to the login page */
  async goto() {
    await this.navigateTo(
      `${process.env.BASE_URL || 'http://localhost:1111'}${LoginPage.PATH}`
    );
    await this.waitForPageReady();
  }

  /** Fill credentials and submit the login form */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
