import { Page, Locator, expect } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly recommendedItemsSection: Locator;
    readonly recommendedItemsCarousel: Locator;
    readonly recommendedVisibleItems: Locator;
    
    constructor(page: Page) {
       this.page = page;
       this.recommendedItemsSection = page.getByText('RECOMMENDED ITEMS');
       this.recommendedItemsCarousel = page.locator('#recommended-item-carousel');
       this.recommendedVisibleItems = page.locator('#recommended-item-carousel .item.active .product-image-wrapper');

    }

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
        await expect(this.recommendedItemsSection).toBeVisible();
    }

    // Returns recommended visible product details dynamically
    async getRecommendedProductInfo(index: number=0) {
        const card = this.recommendedVisibleItems.locator('.productinfo').nth(index);

        const name = await card.locator('p').textContent();
        const price = await card.locator('h2').textContent();
        
        return {
            name: name?.trim() || "",
            price: price?.trim() || ""
        };
    }

    async freezeCarousel() {
        // Runs JavaScript inside the browser
        await this.page.evaluate(() => {
            const carousel = document.querySelector('#recommended-item-carousel');
            // Bootstrap carousel API
            // @ts-ignore
            $(carousel).carousel('pause');
        });
    }

    async clickAddToCartRecommendedProduct(index: number=0) {
        const product = this.recommendedVisibleItems.nth(index);
        await expect(product).toBeVisible();
        await product.getByText('Add to cart').click();
    }

    async hoverOnProduct(index: number=0) {
        await this.page.locator(`//div[@class='single-products']`).nth(index).hover();
    }

    async addProductToCart(index: number=0) {
        await this.page.locator(`//div[@class='single-products']`).nth(index).hover();
        await this.page.locator(`//div[@class='overlay-content']//a[@class='btn btn-default add-to-cart']`).nth(index).click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
        expect(this.page.locator(`//div[@class='modal-content']//div[@class='modal-header']`)).toContainText('Added!');
    }
}