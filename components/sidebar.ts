import { Page, expect } from "@playwright/test";

export default class Sidebar {

    constructor(public page: Page) {}

    async expectCategoryToBeVisible() {
        expect(this.page.locator('.left-sidebar')).toBeVisible();
        expect(this.page.getByText('Category')).toBeVisible();
    }

    async expectBrandsToBeVisible() {
        expect(this.page.locator('.left-sidebar')).toBeVisible();
        expect(this.page.getByText('Brands')).toBeVisible();
    }

    async clickCategory(categoryName: string, subcategoryName: string) {
        const category =  this.page.locator(`//a[normalize-space()='${categoryName}']`);
        await category.click();
        const subcategory = this.page.locator(`//div[@id='${categoryName}']//a[normalize-space()='${subcategoryName}']`);
        await subcategory.click();
    }

    async expectCategoryHeaderToContain(text: string) {
        await expect(this.page.locator('.title.text-center')).toContainText(text);
    }

    async clickBrand(brandName: string) {
        await this.page.click(`//a[@href='/brand_products/${brandName}']`);
        
    }

    async expectBrandHeaderToContain(text: string) {
        await expect(this.page.locator('.title.text-center')).toContainText(text);
    }

}