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

test("Client app login", async ({page}) => {

    const productName = 'Zara Coat 4';
    const products = page.locator('.card-body');

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('lucasalexandre@gmail.com');
    await page.locator("#userPassword").fill('Test@123');
    await page.locator('[value="Login"]').click();

    await page.locator(".card-body b").first().waitFor();

    const count  = await products.count();

    for (let i = 0; i < count; i++) {
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator("text=' Add To Cart").click();
            break;
        };
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    expect(await page.locator(`h3:has-text("${productName}")`).isVisible()).toBeTruthy();
});