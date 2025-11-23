import { Page, Locator, expect } from "@playwright/test";

export default class CheckoutModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly textCheckout: Locator;
    readonly registerLoginLink: Locator;
    readonly continueOnCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator(".modal-content");
        this.textCheckout = page.getByText('Checkout.');
        this.registerLoginLink = page.getByText('Register / Login');
        this.continueOnCartButton = page.getByRole('button', { name: 'Continue On Cart' });
    };

    async expectCheckoutModalToBeVisible() {
        await expect(this.modal).toBeVisible();
        await expect(this.textCheckout).toBeVisible();
    }

    async clickRegisterLogin() {
        await this.registerLoginLink.click();
    }

    async clickContinueOnCart() {
        await this.continueOnCartButton.click();
        await expect(this.textCheckout).toBeHidden();
    }

}