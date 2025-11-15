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

    public async consentDialogIfVisible() {
        const dialog = this.page.locator(`//div[@class='fc-dialog-container']`);
        const consentButton = dialog.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await consentButton.click();
        }
    }

    async expectFullFledgedTextToBeVisible() {
        const text = this.page.getByText('Full-Fledged practice website for Automation Engineers');
        expect(text.first()).toBeVisible();
    }

    async expectRecommendedItemsToBeVisible() {
        expect(this.page.getByText('recommended items')).toBeVisible();
        expect(this.page.locator(`//div[@class='recommended_items']`)).toBeVisible();
    }

    async clickAddToCartRecommended(number: number) {
        const recommendedProduct = this.page.locator('#recommended-item-carousel .item.active .add-to-cart').nth(number-1);
        await recommendedProduct.click();
    }

    async hoverOnProduct(number: number) {
        await this.page.locator(`//div[@class='single-products']`).nth(number-1).hover();
    }

    async clickAddToCartProduct(number: number) {
        await this.page.locator(`//div[@class='overlay-content']//a[@class='btn btn-default add-to-cart']`).nth(number-1).click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Added!');
    }
}