import { Locator, Page, expect } from "@playwright/test";

export default class CartPage {
    readonly page: Page;
    readonly cartTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTable = this.page.locator('#cart_info_table tbody tr');
    };

    async expectCartPageToBeVisible() {
        await expect(this.page).toHaveURL('view_cart');
        await expect(this.page.locator('#cart_info')).toBeVisible();
    } 

    // Returns all Cart products dynamically
    async getCartProducts() {
        const rows = this.cartTable;
        const count = await rows.count();
        const products = [];

        for (let i=0; i<count; i++) {
            const row = rows.nth(i);

            const name = await row.locator('.cart_description h4').textContent();
            const category = await row.locator('.cart_description p').textContent();
            const price = await row.locator('.cart_price').textContent();
            const quantity = await row.locator('.cart_quantity').textContent();
            const total = await row.locator('.cart_total').textContent();

            products.push({
                name: name?.trim() || "",
                category: category?.trim() || "",
                price: price?.trim() || "",
                quantity: quantity?.trim() || "",
                total: total?.trim() || ""
            });
        }
        return products;
    }

    async expectProductsInCart(expectedProducts: Array<{name: string}>) {
        const cartProducts = await this.getCartProducts();
        const cartNames = cartProducts.map(product => product.name);

        for (const expected of expectedProducts) {
            expect(cartNames).toContain(expected.name);
        }
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

    async clickXbutton(index: number) {
        await this.cartTable.nth(index-1).locator('.cart_quantity_delete').click();
    }

    async expectProductHasBeenRemoved(productId: number) {
        const row = this.page.locator(`#product-${productId}`);
        await expect(row).toBeHidden();
    }

    async expectCartIsEmpty() {
        expect(this.page.getByText('Cart is empty! Click here to buy products.')).toBeVisible();
    }

}