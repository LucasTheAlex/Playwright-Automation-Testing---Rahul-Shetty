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

    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('lucasalexandre@gmail.com');
    await page.locator("#userPassword").fill('Test@123');
    await page.locator('[value="Login"]').click();

    await page.locator(".card-body b").first().waitFor();

    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator("text='  Add To Cart'").click();
            break;
        };
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    expect(await page.locator(`h3:has-text("${productName}")`).isVisible()).toBeTruthy();

    await page.locator("text=Checkout").click();

    const formInputs = await page.locator("form input");
    const formSelects = await page.locator("form select");
    await formInputs.nth(0).fill("");

    await formInputs.nth(0).fill("1234 5678 9101 1123");
    await formInputs.nth(1).fill("123");
    await formInputs.nth(2).fill("Lucas Alexandre");

    await formSelects.nth(0).selectOption("03");
    await formSelects.nth(1).selectOption("27");

    await page.locator('[placeholder*="Country"]').pressSequentially('ind', {delay: 150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        let text = await dropdown.locator('button').nth(i).textContent();
        if(text.trim() === "India"){
            await dropdown.locator('button').nth(i).click();
            break;
        };
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText('lucasalexandre@gmail.com');
    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");

    const bruteOrderText = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const order = bruteOrderText.replaceAll('|', '').trim();

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody tr").nth(0).waitFor()
    const rows = await page.locator("tbody tr");
    const rowAmount = await rows.count();

    for (let i = 0; i < rowAmount; i++) {
        let extractedOrder = await rows.nth(i).locator("th").textContent();

        if(extractedOrder.includes(order)){
            await rows.nth(i).locator("button").first().click();
            break;
        };
    }
    const orderIdFromDOM = await page.locator(".col-text").textContent();
    expect(order.includes(orderIdFromDOM.trim())).toBeTruthy();

});