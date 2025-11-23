import { Page, Locator, expect } from "@playwright/test";
import { Product } from "../types/Product";

export default class ProductDetailsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator; 
    readonly addToCartButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('.product-information h2');
        this.category = page.locator('p:has-text("Category")');
        this.price = page.locator('.product-information span span');
        this.availability = page.locator('p:has-text("Availability")');
        this.condition = page.locator('p:has-text("Condition")');
        this.brand = page.locator('p:has-text("Brand")');
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});

    };

    async expectProductDetailsPageToBeVisible(productId: number) {
        await expect(this.page).toHaveURL(`/product_details/${productId}`);
        await expect(this.page.locator('.product-details')).toBeVisible();
    }

    // // getters
    // async getName() {
    //     return this.page.locator('.product-information h2').textContent();
    // }

    // async getCategory() {
    //     return this.page.locator('//p[contains(text(),"Category")]').textContent();
    // }

    // async getPrice() {
    //     return this.page.locator('.product-information span span').textContent();
    // }

    // async getAvailability() {
    //     return this.page.locator('//p[b[contains(text(),"Availability")]]').textContent();
    // }

    // async getCondition() {
    //     return this.page.locator('//p[b[contains(text(),"Condition")]]').textContent();
    // }

    // async getBrand() {
    //     return this.page.locator('//p[b[contains(text(),"Brand")]]').textContent();
    // }

    // // assertion
    // async expectName(expected: string) {
    //     await expect(this.page.locator('.product-information h2')).toHaveText(expected);
    // }

    // async expectCategory(expected: string) {
    //     const category = this.page.locator('//p[contains(text(),"Category")]');
    //     await expect(category).toContainText(expected);
    // }

    // async expectPrice(expected: string) {
    //     const price = this.page.locator('.product-information span span');
    //     await expect(price).toContainText(expected);
    // }

    // async expectAvailability(expected: string) {
    //     const availability = this.page.locator('//p[b[contains(text(),"Availability")]]');
    //     await expect(availability).toContainText(expected);
    // }

    // async expectCondition(expected: string) {
    //     const condition = this.page.locator('//p[b[contains(text(),"Condition")]]');
    //     await expect(condition).toContainText(expected);
    // }

    // async expectBrand(expected: string) {
    //     const brand = this.page.locator('//p[b[contains(text(),"Brand")]]');
    //     await expect(brand).toContainText(expected);
    // }

    async expectProductDetails(product: Product) {
        await expect(this.name).toHaveText(product.name);
        await expect(this.category).toContainText(product.category);
        await expect(this.price).toContainText(product.price);

        if (product.availability) {
        await expect(this.availability).toContainText(product.availability);
        }

        if (product.condition) {
        await expect(this.condition).toContainText(product.condition);
        }

        if (product.brand) {
        await expect(this.brand).toContainText(product.brand);
        }
    }

    async getProductDetails(): Promise<Product> {
        return {
            name: (await this.name.textContent())?.trim() ?? '',
            category: (await this.category.textContent())?.trim() ?? '',
            price: (await this.price.textContent())?.trim() ?? '',
            availability: (await this.availability.textContent())?.trim() ?? '',
            condition: (await this.condition.textContent())?.trim() ?? '',
            brand: (await this.brand.textContent())?.trim() ?? ''
        };
    }

    async expectReviewToBeVisible() {
        expect(this.page.getByText('Write Your Review')).toBeVisible();
    }

    async typeReview(name: string, email: string, review: string) {
        await this.page.locator('#name').type(name);
        await this.page.locator('#email').type(email);
        await this.page.locator('#review').type(review);
    }

    async clickSubmit() {
        await this.page.click('#button-review');
    }

    async successMessage() {
        expect(this.page.getByText('Thank you for your review.')).toBeVisible();
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async increaseQuantity(times: number) {
        const quantity = this.page.locator('#quantity');
        await quantity.clear();
        await quantity.type(`${times}`);
    }

}