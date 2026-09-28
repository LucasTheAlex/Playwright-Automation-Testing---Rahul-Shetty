const { test, expect } = require("@playwright/test");

// Global Level -> Test Level -> Step Level
test('Playwright Special Locators', async ({page}) => {
    // Test Level waiting
    test.setTimeout(60_000);
    const slowExpect = expect.configure({timeout: 9000});
    page.setDefaultTimeout(10_000);

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');

    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    // 5 secs default timeout for expect assertations --{timeout: 10_000} Step Level
    await slowExpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout: 10_000});

    await page.getByRole('link', {name: 'Shop'}).click({timeout: 15_000});
    await page.getByRole('link', {name: 'Shop'}).click();
    await slowExpect(page.locator('.my-4').first()).toHaveText('Shop');

    await page.locator('app-card')
        .filter({hasText: 'Nokia Edge'})
        .getByRole('button')
        .click();

});

test('Popup validations', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', dialog => dialog.accept()),
    // page.on('dialog', dialog => dialog.dismiss()),
    await page.locator('#confirmbtn').click()
    await page.locator('#mousehover').hover();

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href*="lifetime-access"]:visible').click();
});