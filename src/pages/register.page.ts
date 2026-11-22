import { Page, Locator } from '@playwright/test';
import { StandardLayoutPage } from './standard-layout.page';

export class RegisterPage extends StandardLayoutPage {
  // Page URL path
  static readonly PATH = '/register';

  // Form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggle: Locator;
  readonly passwordHint: Locator;
  readonly submitButton: Locator;

  // Feedback & alerts
  readonly errorMessage: Locator;

  // Page elements & navigation links
  readonly pageHeading: Locator;
  readonly pageEyebrow: Locator;
  readonly pageSubtitle: Locator;
  readonly loginLink: Locator;
  readonly continueAsGuestLink: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { level: 1, name: /sign up to start practicing/i });
    this.pageEyebrow = page.locator('.uw-auth-eyebrow');
    this.pageSubtitle = page.locator('.uw-auth-subtitle');

    this.nameInput = page.getByPlaceholder(/how should we call you\?/i);
    this.emailInput = page.getByPlaceholder(/you@example\.com/i);
    this.passwordInput = page.getByPlaceholder(/at least 12 characters/i);
    this.passwordToggle = page.getByRole('button', { name: /showw password|hidew password/i });
    this.passwordHint = page.locator('.uw-field-hint');
    this.submitButton = page.getByRole('button', { name: /create my free account/i });

    this.errorMessage = page
      .locator('[role="alert"], .uw-alert, .error, .error-message, .alert')
      .or(page.getByText(/already in use|already registered|email already exists|password is too weak/i));

    this.loginLink = page.locator('main').getByRole('link', { name: /log in/i });
    this.continueAsGuestLink = page.locator('main').getByRole('link', { name: /continue as a guest/i });
  }

  /** Navigate directly to the register page */
  async goto() {
    await this.navigateTo(
      `${process.env.BASE_URL || 'http://localhost:1111'}${RegisterPage.PATH}`
    );
    await this.waitForPageReady();
  }

  /** Fill register credentials and submit the form */
  async register(name: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
