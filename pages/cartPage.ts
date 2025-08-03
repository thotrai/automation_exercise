import { Page, expect } from "@playwright/test";

export default class CartPage {

    constructor(public page: Page) {};

    async expectCartPageToBeVisible() {
        expect(this.page).toHaveURL('view_cart');
        expect(this.page.locator(`//div[@id='cart_info']`)).toBeVisible();
    } 

    async subscribe(email: string) {
        await this.page.locator(`//input[@id='susbscribe_email']`).type(email);
        await this.page.click(`//button[@id='subscribe']`);
    }

    async expectSubscriptionMesssageToBeVisible() {
        expect(this.page.locator(`//div[@id='success-subscribe']`)).toBeVisible();
        expect(this.page.locator(`//div[@id='success-subscribe']`)).toContainText('You have been successfully subscribed!');
    }

    async expectProductInCart(productId: number) {
        const row = this.page.locator(`#product-${productId}`);
        await expect(row).toBeVisible();
    }
    // many it will need changes
    async expectRandomProductInCart() {
        const row = this.page.locator(`#product-${productId}`);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toBeVisible();
    }

    async verifyCartItemDetails(productId: number, price: string, quantity: string, total: string) {
        const product = this.page.locator(`#product-${productId}`);
        const productPrice = await product.locator('.cart_price').textContent();
        const productQuantity = await product.locator('.cart_quantity').textContent();
        const productTotal = await product.locator('.cart_total').textContent();

        expect(productPrice).toContain(price);
        expect(productQuantity).toContain(quantity);
        expect(productTotal).toContain(total);
    }

    async clickProccedToCheckout() {
        await this.page.getByRole('button', { name: 'Proceed To Checkout'}).click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Checkout');
    }



}