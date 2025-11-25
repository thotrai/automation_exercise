import { Page, Locator, expect } from "@playwright/test";

export default class AccountPage {
    readonly page: Page;
    readonly textAccountCreated: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textAccountCreated = page.getByText('ACCOUNT CREATED!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async expectAccountCreated() {
        await expect(this.page).toHaveURL('account_created');
        await expect(this.textAccountCreated).toBeVisible();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

}
