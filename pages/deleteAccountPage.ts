import { Page, expect } from "@playwright/test";

export default class DeleteAccountPage {

    constructor(public page: Page) {}

    async expectAccountDeleted() {
        expect(this.page).toHaveURL('delete_account');
        expect(this.page.locator(`//b[normalize-space()='Account Deleted!']`)).toBeVisible();
    }

    async clickContinue() {
        await this.page.locator(`//div//a[@data-qa='continue-button']`).click();
    }
}
