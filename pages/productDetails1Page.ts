import { Page, expect } from "@playwright/test";

export default class ProductDetails1Page {

    constructor(public page: Page) {};

    async expectProductDetails1PageToBeVisible() {
        await expect(this.page).toHaveURL('product_details/1');
        await expect(this.page.locator(`//div[@class='product-details']`)).toBeVisible();
    }

    async expectProductDetailsToBeVisible() {
        // product name
        await expect(this.page.locator(`//h2[normalize-space()='Blue Top']`)).toBeVisible();
        await expect(this.page.locator(`//h2[normalize-space()='Blue Top']`)).toContainText('Blue Top');
        // category
        await expect(this.page.locator(`//p[normalize-space()='Category: Women > Tops']`)).toBeVisible();
        // price 
        await expect(this.page.locator(`//span[normalize-space()='Rs. 500']`)).toBeVisible();
        await expect(this.page.locator(`//span[normalize-space()='Rs. 500']`)).toContainText('Rs. 500');
        // availability
        await expect(this.page.locator(`//b[normalize-space()='Availability:']`)).toBeVisible();
        await expect(this.page.locator(`//div[@class='product-details']//p[2]`)).toContainText('In Stock');
        // condition 
        await expect(this.page.locator(`//b[normalize-space()='Condition:']`)).toBeVisible();
        await expect(this.page.locator(`//div[@class='product-details']//p[3]`)).toContainText('New');
        // brand
        await expect(this.page.locator(`//b[normalize-space()='Brand:']`)).toBeVisible();
        await expect(this.page.locator(`//div[@class='product-details']//p[4]`)).toContainText('Polo');  
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

    // needs to be transfered
    async clickViewCart() {
        const modal = this.page.locator(".modal-content");
        expect(modal).toBeVisible();
        await this.page.click(`//p[@class='text-center']//a[@href='/view_cart']`);
    }

}