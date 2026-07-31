import { test, expect, Locator, Page } from '@playwright/test';

class LoginPage {
  emailInput: Locator;
  passwordInput: Locator;
  signInButton: Locator;
  registerLink: Locator;

  constructor(page: Page) {
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.registerLink = page.getByText('Need an account?', { exact: true });
  }

  async goto() {
    await this.emailInput.page().goto('https://rwa-188.130.251.61.sslip.io/login');
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
}

// --- Тесты ---

test('Проверка отображения кнопки Sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.signInButton).toBeVisible();
});

test('Проверка отображения ссылки "Need an account?"', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.registerLink).toBeVisible();
});

test('Проверка ввода текста в поле email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const testEmail = 'test@example.com';
  await loginPage.fillEmail(testEmail);

  await expect(loginPage.emailInput).toHaveValue(testEmail);
});

test('Проверка ввода текста в поле password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const testPassword = 'Testik';
  await loginPage.fillPassword(testPassword);

  await expect(loginPage.passwordInput).toHaveValue(testPassword);
});

test('Проверка перехода на страницу /register при клике на "Need an account?"', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const expectedUrl = 'https://rwa-188.130.251.61.sslip.io/register';

  await loginPage.goto();
  await expect(loginPage.registerLink).toBeVisible();

  await loginPage.clickRegisterLink();

  await expect(page).toHaveURL(expectedUrl);
});
