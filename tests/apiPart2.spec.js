const { test, expect } = require("@playwright/test");

let orderId;
let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page =  await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('lucasalexandre@gmail.com');
    await page.locator("#userPassword").fill('Test@123');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'src/data/state.json'});
    webContext = await browser.newContext({storageState: 'src/data/state.json'});
    await page.close();
});


test("Client app login", async () => {

    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").nth(0).waitFor()
    const rows = await page.locator("tbody tr");
    const rowAmount = await rows.count();

    for (let i = 0; i < rowAmount; i++) {
        let extractedOrder = await rows.nth(i).locator("th").textContent();

        if(extractedOrder.includes(orderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        };
    }
    const orderIdFromDOM = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdFromDOM.trim())).toBeTruthy();
});