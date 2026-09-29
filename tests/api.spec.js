const {test, expect, request} = require('@playwright/test');
const { APIUtils } = require('../src/utils/APIUtils');

let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    token = await apiUtils.getToken('lucasalexandre@gmail.com', 'Test@123');
});

test.beforeEach(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    orderId = await apiUtils.createOrder(token, 'India', '6960eac0c941646b7a8b3e68');
});


test("Client app login", async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

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

test("Client app login 2", async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    let body = JSON.stringify({
        "data": [],
        "message": "No Orders"
    });
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response,
                body,

            })
        }
    );

    await page.locator('button[routerlink*="myorders"]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator('.mt-4').textContent());
});