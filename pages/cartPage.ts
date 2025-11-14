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
        await this.page.getByText('Proceed To Checkout').click();
        // await this.page.waitForSelector('.modal-content', { state: 'visible' });
        // expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Checkout');
    }

    async clickXbutton() {
        await this.page.locator('a.cart_quantity_delete').click();
    }

    async expectProductHasBeenRemoved(productId: number) {
        const row = this.page.locator(`#product-${productId}`);
        await expect(row).toBeHidden();
    }

    async expectCartIsEmpty() {
        expect(this.page.getByText('Cart is empty! Click here to buy products.')).toBeVisible();
    }

}