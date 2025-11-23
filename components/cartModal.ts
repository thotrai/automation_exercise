import { Locator, Page, expect } from "@playwright/test";

export default class CartModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly textModal: Locator;
    readonly viewCartLink: Locator;
    readonly continueShopipingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator(".modal-content");
        this.textModal = page.getByText('Your product has been added to cart.');
        this.viewCartLink = page.getByText('View Cart');
        this.continueShopipingButton = page.getByRole('button', { name: 'Continue Shopping' });
    };

    async expectCartModalToBeVisible() {
        await expect(this.modal).toBeVisible();
        await expect(this.textModal).toBeVisible();
    }

    async clickViewCart() {
        await this.viewCartLink.click();
    }

    async clickContinueShopping() {
        await this.continueShopipingButton.click();
        await expect(this.modal).toBeHidden();
    }

}