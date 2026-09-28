const {test, expect} = require('@playwright/test');



test("Browser context playwright test", async ({browser}) => {
    // chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    /**
     * If ID is prsented
     * css -> tagname#id or #id
     * 
     * if class attribute is present
     * css -> tagname.class or .class
     * 
     * write css based on any Attribute
     * css -> [attribute='value']
     * 
     * write css with traversing from parent to child
     * css -> parent tag name >> child tag name
     * 
     * if needs to write the locator based on text
     * text=''
     */

    // page.locator('input#username');
    const username = page.locator('#username');
    // page.locator('input.form-class');
    // page.locator('.form-class');
    // page.locator('[name="username"]');
    // page.locator('.form-class');
    const signIn = page.locator('#signInBtn');

    await username.fill('rahulshetty');
    await page.locator('[type="password"]').fill('Learning@830$3mK2');

    await signIn.click();

    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    await username.fill('');
    await username.fill('rahulshettyacademy');
    await signIn.click();

    const cardTitles = page.locator('.card-body a');

    // console.log(await cardTitles.nth(0).textContent());
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.last().textContent());
    // console.log(await cardTitles.filter({hasText: "iphone X"}).textContent());
    console.log(await cardTitles.allTextContents());
});

test("UI controls", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator('#username');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('[href*="documents-request"]');

    await username.fill('rahulshettyacademy');
    await page.locator('[type="password"]').fill('Learning@830$3mK2');
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

    console.log(await page.locator("#username").inputValue());
});

test("Child window handler", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator('[href*="documents-request"]');
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),// Listen for any new page pending, rejected, fullfilled
        documentLink.click()
    ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const splitedText = text.split(" ");
    const findEmail = splitedText.filter((text) => {
        return text.match("@");
    });
    console.log(findEmail);

    const username = page.locator('#username');
    await username.fill(findEmail[0]);
    console.log(await username.inputValue());
    await page.pause();
});

