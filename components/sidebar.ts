import { Page, Locator, expect } from "@playwright/test";

export default class Sidebar {
    readonly page: Page;
    readonly sidebar: Locator;
    readonly textCategory: Locator;
    readonly textBrands: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscribeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator('.left-sidebar');
        this.textCategory = page.getByText('Category');
        this.textBrands = page.getByText('Brands');
        this.emailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = page.locator('#subscribe');
        this.subscribeMessage = page.getByText('You have been successfully subscribed!');

    }

    async expectCategoryToBeVisible() {
        await expect(this.sidebar).toBeVisible();
        await expect(this.textCategory).toBeVisible();
    }

    async expectBrandsToBeVisible() {
        await expect(this.sidebar).toBeVisible();
        await expect(this.textBrands).toBeVisible();
    }

    async clickCategory(categoryName: string, subcategoryName: string) {
        const category =  this.page.locator(`//a[normalize-space()='${categoryName}']`);
        await category.click();
        const subcategory = this.page.locator(`//div[@id='${categoryName}']//a[normalize-space()='${subcategoryName}']`);
        await subcategory.click();
    }

    // categoryProductsPage?
    async expectCategoryHeaderToContain(text: string) {
        await expect(this.page.locator('.title.text-center')).toContainText(text);
    }

    async clickBrand(brandName: string) {
        await this.page.click(`//a[@href='/brand_products/${brandName}']`);
        
    }

    // brandProductsPage?
    async expectBrandHeaderToContain(text: string) {
        await expect(this.page.locator('.title.text-center')).toContainText(text);
    }

}