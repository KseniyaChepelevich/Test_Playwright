const{chromium} = require('playwright');
const authorization = require('./user');



(async() => {
    const browser = await chromium.launch(
        {headless: false, slowMo: 5000, devtools: true}
    );
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');

    await page.goto('https://netology.ru/?modal=sign_in');
    page.waitForNavigation(/*{ timeout: 6000000000, url: 'https://netology.ru/?modal=sign_in' }*/),
   

    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(authorization.email);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(authorization.password);
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
        page.locator('[data-testid="login-submit-btn"]').click()
      ]);

      await page.pause();

      await expect(page).toHaveURL('https://netology.ru/profile');
    
    


    //const handle = await page.$('input[name="email"]');
    //await page.waitForSelector('[placeholder="Email"]');
    //await page.waitForSelector('text="Войти"');
    //await page.waitForSelector('input[name="email"]');
    //await page.fill('input[name="email"]', "@gmail.com");
   // await page.click('input[name="email"]');
    //await page.waitForSelector('button:text("Войти")');
    //await page.locator.waitForSelector('button:text("Войти")');
    //await page.waitForSelector('h1', {state: 'attached', timeout: 6000000});
    //await page.$("name='email'").click();
    //await page.click("name='email'");
    //const title = page.locator('[id="app"]', {waitFor: "visible", timeout: 50000000});
    //await page.waitForSelector('button[data-testid="login-submit-btn"]');
    //await page.waitForNavigation({timeout: 5000000});

    
    //await page.waitForLoadState();
    
    
    await browser.close();

})();
