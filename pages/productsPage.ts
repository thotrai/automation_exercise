import { Page, Locator, expect } from "@playwright/test";

export default class ProductsPage {
    readonly page: Page;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = this.page.locator('.productinfo');
    }

    async expectProductsPageToBeVisible() {
        expect(this.page).toHaveURL('products');
        expect(this.page.locator(`//div[@class='features_items']`)).toBeVisible();
    } 

    // Returns product details dynamically
    async getProductInfo(index: number) {
        const card = this.productCards.nth(index-1);

        const name = await card.locator('p').textContent();
        const price = await card.locator('h2').textContent();
        
        return {
            name: name?.trim() || "",
            price: price?.trim() || ""
        };
    }

    async clickViewProduct(index: number) {
        await this.page.getByText('View Product').nth(index-1).click();
    }

    async searchProduct(productName: string) {
        await this.page.getByPlaceholder('Search Product').type(`${productName}`);
        await this.page.locator("#submit_search").click();
    }

    async expectSearchedProductsToBeVisible(searchedProduct: string) {
        await expect(this.page).toHaveURL(new RegExp(`products\\?search=${searchedProduct}`));
        await expect(this.page.locator(`//h2[normalize-space()='Searched Products']`)).toBeVisible();

        const results = this.page.locator('.productinfo p');
        const count = await results.count();

        for (let i = 0; i < count; i++) {
            await expect(results.nth(i)).toContainText(searchedProduct);
        } 
    }

    async clickAddToCart(index: number) {
        await this.page.locator('.single-products').nth(index-1).hover();
        await this.page.locator('.overlay-content .add-to-cart').nth(index-1).click();

        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Added!');
    }

}