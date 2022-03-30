const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Go to https://netology.ru/?modal=sign_in
  await page.goto('https://netology.ru/?modal=sign_in');

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('sinyawinalp10@gmail.com');

  // Click [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').click();

  // Fill [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').fill('K26A08s85');

  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.locator('[data-testid="login-submit-btn"]').click()
  ]);
  await expect(page).toHaveURL('https://netology.ru/profile');

});