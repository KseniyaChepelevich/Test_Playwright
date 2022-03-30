const { chromium } = require('playwright');
const authorization = require("./user");

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Go to https://netology.ru/?modal=sign_in
  await page.goto('https://netology.ru/?modal=sign_in');

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(authorization.email);

  // Click [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').click();

  // Fill [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').fill(authorization.password);

  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.locator('[data-testid="login-submit-btn"]').click()
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();