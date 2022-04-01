const { chromium } = require('playwright');
const authorization = require('./user');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 5000,
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();

    // Go to https://netology.ru/
    await page.goto('https://netology.ru/');
    await page.waitForNavigation(/*{ timeout: 600000000000; url: 'https://netology.ru/?modal=sign_in'; waitUntill: 'domcontentloaded' }*/);
    await page.waitForSelector('h1');

    // Click text=Войти
    await page.locator('text=Войти').click();
    // assert.equal(page.url(), 'https://netology.ru/?modal=sign_in');

    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();

    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill(authorization.validEmail);

    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();

    // Fill [placeholder="Пароль"]
    await page
        .locator('[placeholder="Пароль"]')
        .fill(authorization.validPassword);
    await page.screenshot({
        path: Date.now() + 'screenshot1.png',
    });

    // Click [data-testid="login-submit-btn"]
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://netology.ru/profile'; waitUntill: 'domcontentloaded' }*/),
        await page.screenshot({
            path: Date.now() + 'screenshot2.png',
        }),
        page.locator('[data-testid="login-submit-btn"]').click(),
    ]);

    await page.locator('text=Мои курсы и профессии').click();

    await page.pause();

    await expect(page).toHaveURL('https://netology.ru/profile');
    await expect(page.locator('h2')).toHaveText('Мои курсы и профессии');

    // ---------------------
    await context.close();
    await browser.close();
})();
