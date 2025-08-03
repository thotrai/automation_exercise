import { Page, expect } from "@playwright/test";

export default class AccountPage {

    constructor(public page: Page) {}

    async expectAccountCreated() {
        expect(this.page).toHaveURL('account_created');
        expect(this.page.locator(`//b[normalize-space()='Account Created!']`)).toBeVisible();
    }

    async expectAccountDeleted() {
        expect(this.page).toHaveURL('delete_account');
        expect(this.page.locator(`//b[normalize-space()='Account Deleted!']`)).toBeVisible();
    }

    async clickContinue() {
        await this.page.locator(`//div//a[@data-qa='continue-button']`).click();
    }

}
