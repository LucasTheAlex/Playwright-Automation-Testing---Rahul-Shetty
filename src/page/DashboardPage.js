class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(product) {
        await this.productsText.first().waitFor();
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === product) {
                await this.products.nth(i).locator("text='  Add To Cart'").click();
                break;
            };
        }
        await this.cart.click();
    }
}

module.exports = {DashboardPage};