import { Page, expect } from "@playwright/test";

export default class ProductsPage {

    constructor(public page: Page) {};

    async expectProductsPageToBeVisible() {
        expect(this.page).toHaveURL('products');
        expect(this.page.locator(`//div[@class='features_items']`)).toBeVisible();
    } 

    async clickViewProduct(number: number) {
        await this.page.getByText('View Product').nth(number-1).click();
    }

    async searchProduct(product: string) {
        await this.page.getByPlaceholder('Search Product').type(`${product}`);
        await this.page.click(`//button[@id='submit_search']`);
    }

    async expectSearchedProductsToBeVisible(product: string) {
        await expect(this.page).toHaveURL(new RegExp(`products\\?search=${product}`));
        await expect(this.page.locator(`//h2[normalize-space()='Searched Products']`)).toBeVisible();

        const products = this.page.locator(`//div[@class='productinfo text-center']/p[contains(text(), '${product}')]`);
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            await expect(products.nth(i)).toBeVisible();
        } 
        console.log(`Found ${count} products.`);
    }

    async hoverOnProduct(number: number) {
        await this.page.locator(`//div[@class='single-products']`).nth(number-1).hover();
    }

    async clickAddToCartProduct(number: number) {
        await this.page.locator(`//div[@class='overlay-content']//a[@class='btn btn-default add-to-cart']`).nth(number-1).click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Added!');
    }

    async clickContinueShopping() {
        expect(this.page.locator(`//div[@class='modal-content']`)).toBeVisible();
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async clickViewCart() {
        expect(this.page.locator(`//div[@class='modal-content']`)).toBeVisible();
        await this.page.click(`//p[@class='text-center']//a[@href='/view_cart']`);
    }

}