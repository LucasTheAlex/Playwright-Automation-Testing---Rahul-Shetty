const {test, expect} = require('@playwright/test');
const { customTest } = require('../src/fixtures/fixture');

customTest("Fixture demo", async ({authenticatedPage}) => {
   await authenticatedPage.goto('https://rahulshettyacademy.com/client');
   console.log("Running on azure");
});