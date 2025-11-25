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
        this.cartTable = page.locator('#cart_info');
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

    async expectProductsInCart(expected: Partial<CartItem>) {
        const row = this.rowByProductName(expected.name!);
        await expect(row).toBeVisible();

        const actual = await this.getCartItem(expected.name!);

        expect(actual.price).toContain(expected.price);
        if (expected.quantity) {
            expect(actual.quantity).toBe(expected.quantity);
        }
        if (expected.total) {
            expect(actual.total).toContain(expected.total);
        }
    }   

    async clickProccedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async removeItem(name: string) {
        const row = this.rowByProductName(name);
        const removeButton = row.locator('.cart_quantity_delete');
        await removeButton.click();

        await expect(row).toBeHidden();
    }

    async expectCartIsEmptyToBeVisible() {
        await expect(this.textCartIsEmpty).toBeVisible();
    }
    
    async expectProductQuantity(name: string, expectedQuantity: number) {
        const item = this.getCartItem(name);
        const quantity = (await item).quantity;
        expect(quantity).toBe(expectedQuantity);
    }

    async expectProductsInCartList(expectedProducts: Partial<CartItem>[]) {
        for (const product of expectedProducts) {
            const row = this.rowByProductName(product.name!);
            await expect(row).toBeVisible();

            const actual = await this.getCartItem(product.name!);

            if (product.price) {
                expect(actual.price).toContain(product.price);
            }
        }
    }

}