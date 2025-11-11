import { Page, expect } from "@playwright/test";

export default class CartPage {

    constructor(public page: Page) {};

    async expectCartPageToBeVisible() {
        expect(this.page).toHaveURL('view_cart');
        expect(this.page.locator(`//div[@id='cart_info']`)).toBeVisible();
    } 

    async expectProductInCart(productId: number) {
        const row = this.page.locator(`#product-${productId}`);
        await expect(row).toBeVisible();
    }
    // maby it will need changes
    async expectRandomProductInCart(productId: number) {
        const row = this.page.locator(`#product-${productId}`);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toBeVisible();
    }

    async verifyCartItemDetails(productId: number, price: string, quantity: string, total: string) {
        const product = this.page.locator(`#product-${productId}`);
        const productPrice = await product.locator('.cart_price').textContent();
        expect(productPrice).toContain(price);
        const productQuantity = await product.locator('.cart_quantity').textContent();
        expect(productQuantity).toContain(quantity);
        const productTotal = await product.locator('.cart_total').textContent();
        expect(productTotal).toContain(total);
    }

    async clickProccedToCheckout() {
        await this.page.getByRole('button', { name: 'Proceed To Checkout'}).click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Checkout');
    }

    // checkout modal
    async expectCheckoutModalToBeVisible() {
        const modal = this.page.locator(".modal-content");
        await expect(modal).toBeVisible();
        expect(this.page.getByText('Checkout.')).toBeVisible();
    }

    async clickRegisterLogin() {
        await this.page.click(`//u[contains(text(),"Register / Login")]`);
    }

    async clickContinueOnCart() {
        await this.page.getByRole('button', {name: 'Continue On Cart'}).click();
        expect(this.page.locator(".modal-content")).toBeHidden();
    }

}