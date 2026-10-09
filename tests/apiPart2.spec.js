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

test("Security test request intercept", async () => {
    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").nth(0).waitFor()
    const rows = await page.locator("tbody tr");
    const rowAmount = await rows.count();

    for (let i = 0; i < rowAmount; i++) {
        let extractedOrder = await rows.nth(i).locator("th").textContent();

        if(extractedOrder.includes(orderId)){
            await rows.nth(i).locator("button").last().click();
            break;
        };
    }
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6404e7f0c1b6d7001b3f5123"}));
    await page.locator("button:has-text('View')").click();
    await expect(page.locator('p').last()).toHaveText('You are not authorized to view this order');
});

test("Abort CSS call", async () => {

    const page = await webContext.newPage();
    page.route("**/*.css", route => route.abort());
    // page.route("**/*.{jpg,png,jpeg}", route => route.abort());

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").nth(0).waitFor()
    const rows = await page.locator("tbody tr");
    const rowAmount = await rows.count();

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
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