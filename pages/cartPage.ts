import { Page, Locator, expect } from "@playwright/test";
import { CartItem } from "../types/CartItem";

export default class CartPage {
    readonly page: Page;
    readonly cartTable: Locator;
    readonly cartRows: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly textCartIsEmpty: Locator
    

    constructor(page: Page) {
        this.page = page;
        this.cartTable = page.locator('#cart_info_table');
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
        this.textCartIsEmpty = this.page.getByText('Cart is empty! Click here to buy products.');
    };

    async expectCartPageToBeVisible() {
        await expect(this.page).toHaveURL('view_cart');
        await expect(this.cartTable).toBeVisible();
    } 

    // Use it as a Locator
    private rowByProductName(name: string): Locator {
        return this.cartRows.filter({ hasText: name }).first();
    }

    async getCartItem(name: string): Promise<CartItem> {
        const row = this.rowByProductName(name);
        const price = await row.locator('.cart_price').textContent();
        const quantity = await row.locator('.cart_quantity input, .cart_quantity button').textContent();
        const total = await row.locator('.cart_total').textContent();
        
        return {
            name,
            price: price?.trim() ?? '',
            quantity: Number(quantity?.trim()) || 0,
            total: total?.trim() ?? ''
        }
    }

    // // Returns all Cart products dynamically
    // async getCartProducts() {
    //     const rows = this.cartTable;
    //     const count = await rows.count();
    //     const products = [];

    //     for (let i=0; i<count; i++) {
    //         const row = rows.nth(i);

    //         const name = await row.locator('.cart_description h4').textContent();
    //         const category = await row.locator('.cart_description p').textContent();
    //         const price = await row.locator('.cart_price').textContent();
    //         const quantity = await row.locator('.cart_quantity').textContent();
    //         const total = await row.locator('.cart_total').textContent();

    //         products.push({
    //             name: name?.trim() || "",
    //             category: category?.trim() || "",
    //             price: price?.trim() || "",
    //             quantity: quantity?.trim() || "",
    //             total: total?.trim() || ""
    //         });
    //     }
    //     return products;
    // }

    async expectProductsInCart(expected: CartItem) {
        const row = this.rowByProductName(expected.name);
        await expect(row).toBeVisible();

        const actual = await this.getCartItem(expected.name);

        expect(actual.price).toContain(expected.price);
        expect(actual.quantity).toBe(expected.quantity);
        expect(actual.total).toContain(expected.total);
    }

    // async expectProductInCart(productId: number) {
    //     const row = this.page.locator(`#product-${productId}`);
    //     await expect(row).toBeVisible();
    // }
    // // maby it will need changes
    // async expectRandomProductInCart(productId: number) {
    //     const row = this.page.locator(`#product-${productId}`);
    //     await row.scrollIntoViewIfNeeded();
    //     await expect(row).toBeVisible();
    // }

    // async verifyCartItemDetails(productId: number, price: string, quantity: string, total: string) {
    //     const product = this.page.locator(`#product-${productId}`);
    //     const productPrice = await product.locator('.cart_price').textContent();
    //     expect(productPrice).toContain(price);
    //     const productQuantity = await product.locator('.cart_quantity').textContent();
    //     expect(productQuantity).toContain(quantity);
    //     const productTotal = await product.locator('.cart_total').textContent();
    //     expect(productTotal).toContain(total);
    // }

    async clickProccedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async removeItem(name: string) {
        const row = this.rowByProductName(name);
        const removeButton = row.locator('.cart_quantity_delete');
        await removeButton.click();

        await expect(row).toBeHidden();
    }

    // async expectProductHasBeenRemoved(productId: number) { //
    //     const row = this.page.locator(`#product-${productId}`);
    //     await expect(row).toBeHidden();
    // }

    async expectCartIsEmptyToBeVisible() {
        await expect(this.textCartIsEmpty).toBeVisible();
    }
    
    async expectProductQuantity(name: string, expectedQuantity: number) {
        const item = this.getCartItem(name);
        const quantity = (await item).quantity;
        expect(quantity).toBe(expectedQuantity);
    }

}