const {test, expect} = require('@playwright/test');

test("Browser context playwright test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('anshika@gmail.com');
    await page.locator("#userPassword").fill('Iamking@000');
    await page.locator('[value="Login"]').click();
    // await page.waitForLoadState('networkidle');
    // await page.waitForLoadState('domcontentloaded');
    await page.locator('.card-body b').first().waitFor();
    await page.waitForSelector('.card-body b');
    await page.locator('.card-body b').allTextContents();
});

