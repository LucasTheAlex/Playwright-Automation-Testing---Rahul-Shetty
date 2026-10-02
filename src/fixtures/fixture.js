const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({browser}, use) => {
            const context = await browser.newContext();
            const page =  await context.newPage();

            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill('lucasalexandre@gmail.com');
            await page.locator("#userPassword").fill('Test@123');
            await page.locator('[value="Login"]').click();
            await page.waitForLoadState('networkidle');
            await use(page);
        },
    }
)