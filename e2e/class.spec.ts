import { test, expect, Locator, Page } from '@playwright/test';

class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly registerLink: Locator;

  private readonly url = 'https://rwa-188.130.251.61.sslip.io/login';

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.registerLink = page.getByText('Need an account?', { exact: true });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }
}

class RegisterPage {
  readonly page: Page;
  readonly url = 'https://rwa-188.130.251.61.sslip.io/register';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPage() {
    await expect(this.page).toHaveURL(this.url);
  }
}

// --- Тесты ---

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Проверка отображения кнопки Sign in', async () => {
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('Проверка отображения ссылки "Need an account?"', async () => {
    await expect(loginPage.registerLink).toBeVisible();
  });

  test('Проверка ввода текста в поле email', async () => {
    const testEmail = 'test@example.com';
    await loginPage.fillEmail(testEmail);
    await expect(loginPage.emailInput).toHaveValue(testEmail);
  });

  test('Проверка ввода текста в поле password', async () => {
    const testPassword = 'Testik';
    await loginPage.fillPassword(testPassword);
    await expect(loginPage.passwordInput).toHaveValue(testPassword);
  });

  test('Проверка перехода на страницу /register при клике на "Need an account?"', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await loginPage.clickRegisterLink();
    await registerPage.waitForPage();
  });
});
