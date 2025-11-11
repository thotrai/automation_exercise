import { Page, expect } from "@playwright/test";

export default class HomePage {

    constructor(public page: Page) {}

    async navigate() {
        await this.page.goto('/');
        await this.consentDialogIfVisible();
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    async expectHomePageToBeVisible() {
        await expect(this.page).toHaveURL('https://www.automationexercise.com/');
        await expect(this.page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    }

    async clickSignupLogin() {
        await this.page.click(`//a[@href='/login']`);
    }

    async clickLogout() {
        await this.page.click(`//a[@href='/logout']`);
    }

    async clickContactUs() {
        await this.page.click(`//a[@href='/contact_us']`);
    }

    async clickTestCases() {
        await this.page.click(`//a[@href='/test_cases']`);
    }

    async clickProducts() {
        await this.page.click(`//a[@href='/products']`);
    }

    async clickDeleteAccount() {
        await this.page.click(`//a[@href='/delete_account']`);
    }

    async clickCart() {
        await this.page.click(`//a[@href='/view_cart']`);
    }

    public async consentDialogIfVisible() {
        const dialog = this.page.locator(`//div[@class='fc-dialog-container']`);
        const consentButton = dialog.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await consentButton.click();
        }
    }
    
    async expectLoggedInAs(name: string) {
        await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
    }

    async expectFullFledgedTextToBeVisible() {
        const text = this.page.getByText('Full-Fledged practice website for Automation Engineers');
        expect(text.first()).toBeVisible();
    }

    async expectRecommendedItemsToBeVisible() {
        expect(this.page.getByText('recommended items')).toBeVisible();
        expect(this.page.locator(`//div[@class='recommended_items']`)).toBeVisible();
    }

    async clickAddToCart() {
        const firstRecommendedProducts = this.page.locator('#recommended-item-carousel .item.active .add-to-cart').first();
        await firstRecommendedProducts.click();
    }

}