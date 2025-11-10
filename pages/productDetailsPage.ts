import { Page, expect } from "@playwright/test";

export default class ProductDetailsPage {

    constructor(public page: Page) {};

    async expectProductDetailsPageToBeVisible(productId: number) {
        await expect(this.page).toHaveURL(`/product_details/${productId}`);
        await expect(this.page.locator('.product-details')).toBeVisible();
    }

    // getters
    async getName() {
        return this.page.locator('.product-information h2').textContent();
    }

    async getCategory() {
        return this.page.locator('//p[contains(text(),"Category")]').textContent();
    }

    async getPrice() {
        return this.page.locator('.product-information span span').textContent();
    }

    async getAvailability() {
        return this.page.locator('//p[b[contains(text(),"Availability")]]').textContent();
    }

    async getCondition() {
        return this.page.locator('//p[b[contains(text(),"Condition")]]').textContent();
    }

    async getBrand() {
        return this.page.locator('//p[b[contains(text(),"Brand")]]').textContent();
    }

    // assertion
    async expectName(expected: string) {
        await expect(this.page.locator('.product-information h2')).toHaveText(expected);
    }

    async expectCategory(expected: string) {
        const category = this.page.locator('//p[contains(text(),"Category")]');
        await expect(category).toContainText(expected);
    }

    async expectPrice(expected: string) {
        const price = this.page.locator('.product-information span span');
        await expect(price).toContainText(expected);
    }

    async expectAvailability(expected: string) {
        const availability = this.page.locator('//p[b[contains(text(),"Availability")]]');
        await expect(availability).toContainText(expected);
    }

    async expectCondition(expected: string) {
        const condition = this.page.locator('//p[b[contains(text(),"Condition")]]');
        await expect(condition).toContainText(expected);
    }

    async expectBrand(expected: string) {
        const brand = this.page.locator('//p[b[contains(text(),"Brand")]]');
        await expect(brand).toContainText(expected);
    }

    async expectReviwToBeVisible() {
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
        await this.page.getByRole('button', {name: 'Add to cart'}).click();
    }

    async increaseQuantityNTimes(times: number) {
        const quantity = this.page.locator('#quantity');
        await quantity.clear();
        await quantity.type(`${times}`);
    }

    // needs to be transfered to a new modalPage for common use???
    async clickViewCart() {
        const modal = this.page.locator(".modal-content");
        await expect(modal).toBeVisible();
        await this.page.click(`//u[contains(text(),"View Cart")]`);
    }

}