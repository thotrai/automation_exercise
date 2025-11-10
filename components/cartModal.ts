import { Page, expect } from "@playwright/test";

export default class CartModal {

    constructor(public page: Page) {};

    async expectCartModalToBeVisible() {
        const modal = this.page.locator(".modal-content");
        await expect(modal).toBeVisible();
        expect(this.page.getByText('Your product has been added to cart.')).toBeVisible();
    }

    async clickViewCart() {
        await this.page.click(`//u[contains(text(),"View Cart")]`);
    }

    async clickContinueShopping() {
        await this.page.getByRole('button', {name: 'Continue Shopping'}).click();
        expect(this.page.locator(".modal-content")).toBeHidden();
    }

}