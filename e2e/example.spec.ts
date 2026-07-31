import { test, expect } from '@playwright/test';

test('Проверка отображения кнопки Sign in', async ({ page }) => {
  await page.goto('https://rwa-188.130.251.61.sslip.io/login');

  const signInButton = page.getByRole('button', { name: 'Sign in' });

  // Проверяем, что кнопка есть и видна
  await expect(signInButton).toBeVisible();
});

test('Проверка отображения кнопки Sign up', async ({ page }) => {
  await page.goto('https://rwa-188.130.251.61.sslip.io/login');

  const signUpButton = page.getByRole('link', { name: 'Sign up' });

  // Проверяем, что кнопка есть и видна
  await expect(signUpButton).toBeVisible();
});

test('Проверка ввода текста в поле email', async ({ page }) => {
  await page.goto('https://rwa-188.130.251.61.sslip.io/login');

  const emailInput = page.getByPlaceholder('Email');

  const testEmail = 'test@example.com';

  await emailInput.fill(testEmail);

  // Проверяем, что значение установлено
  await expect(emailInput).toHaveValue(testEmail);
});

test('Проверка ввода текста в поле pasword', async ({ page }) => {
  await page.goto('https://rwa-188.130.251.61.sslip.io/login');

  const passwordInput = page.getByPlaceholder('Password');

  const testPassword = 'Testik';

  await passwordInput.fill(testPassword);

  // Проверяем, что значение установлено
  await expect(passwordInput).toHaveValue(testPassword);
});

test('Проверка перехода на страницу /register при клике на кнопку Need an account?', async ({ page }) => {
  const registerLinkText = 'Need an account?';
  const expectedUrl = 'https://rwa-188.130.251.61.sslip.io/register';

  await page.goto('https://rwa-188.130.251.61.sslip.io/login');

  // Находим ссылку по тексту
  const registerLink = page.getByText(registerLinkText, { exact: true });

  // Проверяем, что ссылка видна
  await expect(registerLink).toBeVisible();

  // Кликаем
  await registerLink.click();

  // Ждём навигации и проверяем URL
  await expect(page).toHaveURL(expectedUrl);
});
