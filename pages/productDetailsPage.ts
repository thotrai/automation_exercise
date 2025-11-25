import { Page, Locator, expect } from "@playwright/test";
import { Product } from "../types/Product";

export default class ProductDetailsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly quantity: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator; 
    readonly addToCartButton: Locator;
    readonly reviewSection: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly reviewInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('.product-information h2');
        this.category = page.locator('p:has-text("Category")');
        this.price = page.locator('.product-information span span');
        this.quantity = page.locator('#quantity');
        this.availability = page.locator('p:has-text("Availability")');
        this.condition = page.locator('p:has-text("Condition")');
        this.brand = page.locator('p:has-text("Brand")');
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.reviewSection = page.getByText('Write Your Review');
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.reviewInput = page.locator('#review');
        this.submitButton = page.locator('#button-review');
        this.successMessage = page.getByText('Thank you for your review.');
    };

    async expectProductDetailsPageToBeVisible(productId: number) {
        await expect(this.page).toHaveURL(`/product_details/${productId}`);
        await expect(this.page.locator('.product-details')).toBeVisible();
    }

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
        await expect(this.reviewSection).toBeVisible();
    }

    async fillReview(name: string, email: string, review: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async expectSuccessMessageToBeVisible() {
        await expect(this.successMessage).toBeVisible();
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async increaseQuantity(times: number) {
        await this.quantity.clear();
        await this.quantity.type(`${times}`);
    }

}