import { Page, Locator, expect } from "@playwright/test";
import { Product } from "../types/Product";

export default class ProductsPage {
    readonly page: Page;
    readonly productsSection: Locator;
    readonly productCards: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly textSearcedProducts: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsSection = page.locator('.features_items');
        this.productCards = page.locator('.product-image-wrapper');
        this.searchInput = page.getByPlaceholder('Search Product');
        this.searchButton = page.locator("#submit_search");
        this.textSearcedProducts = page.getByText('Searched Products');
        this.addToCartButton = page.locator('.overlay-content .add-to-cart');
    }

    // Use it as a Locator for finding card by product name
    private productCartByName(name: string): Locator {
        return this.productCards.filter({ hasText: name }).first();
    }

    async expectProductsPageToBeVisible() {
        expect(this.page).toHaveURL('products');
        expect(this.productsSection).toBeVisible();
    } 

    async clickViewProductByName(name: string) {
        const card = this.productCartByName(name);
        await expect(card).toBeVisible();
        await card.getByText('View Product').click();
    }

    // Returns product details dynamically
    async getProductInfoByName(name: string): Promise<Partial<Product>> {
        const card = this.productCartByName(name);
        const price = await card.locator('h2').textContent();
        
        return {
            name,
            price: price?.trim() || ""
        };
    }

    async searchProduct(name: string) {
        await this.searchInput.fill(name);
        await this.searchButton.click();
    }

    async expectSearchedProductsToBeVisible(searchedProduct: string) {
        await expect(this.page).toHaveURL(new RegExp(`products\\?search=${searchedProduct}`));
        await expect(this.textSearcedProducts).toBeVisible();

        const results = this.productCards;
        const count = await results.count();

        for (let i = 0; i < count; i++) {
            await expect(results.nth(i)).toContainText(searchedProduct);
        } 
    }
    
    async addProductToCartByName(name: string) {
        const card = this.productCartByName(name);
        await expect(card).toBeVisible();
        await card.hover();
        await card.getByText('Add to cart').nth(1).click();

        await this.page.waitForSelector('.modal-content', { state: 'visible' });
    }

}