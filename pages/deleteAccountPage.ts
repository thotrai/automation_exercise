import { Page, Locator, expect } from "@playwright/test";

export default class DeleteAccountPage {
    readonly page: Page;
    readonly textAccountDeleted: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textAccountDeleted = page.getByText('ACCOUNT DELETED!');
        this.continueButton = page.getByRole('link', { name: 'Continue' })΄
    }    

    async expectAccountDeleted() {
        expect(this.page).toHaveURL('delete_account');
        expect(this.textAccountDeleted).toBeVisible();
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
