import { Page, Locator, expect } from "@playwright/test";

export default class BrandProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly card: Locator;
    readonly image: Locator;
    readonly name: Locator;
    readonly price: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h2.title.text-center');
        this.card = page.locator('.product-image-wrapper');
        this.image = page.locator('img');
        this.name = page.locator('.productinfo p');
        this.price = page.locator('.productinfo h2');
    }

    async expectBrandProductsPageToBeVisible(brand: string) {
        await expect(this.page).toHaveURL(`/brand_products/${brand}`);
    }

    async expectBrandHeaderToContain(brand: string) {
        await expect(this.title).toContainText(brand);
    }

    // Sanity check
    async expectProductsToBeDisplayed() {
        const count = await this.card.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            await expect(this.image.nth(i)).toBeVisible();
            await expect(this.name.nth(i)).not.toBeEmpty();
            await expect(this.price.nth(i)).not.toBeEmpty();
        }
    }

}