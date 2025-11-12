import { Page, expect } from "@playwright/test";

export default class CheckoutModal {

    constructor(public page: Page) {};

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