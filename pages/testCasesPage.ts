import { Page, expect } from "@playwright/test";

export default class TestCasesPage {

    constructor(public page: Page) {}

    async expectTestCasesPageToBeVisible() {
        await expect(this.page).toHaveURL('test_cases');
        await expect(this.page.locator(`//b[normalize-space()='Test Cases']`)).toBeVisible();
    }

    async countTestCases() {
        const testCases = this.page.locator(`//div[@class='panel-group']//div//div//h4//a//u`);
        const count = await testCases.count();
        for (let i = 0; i < count; i++) {
            await expect(testCases.nth(i)).toBeVisible();
        }
        console.log(`Number of test cases: ${count}`);
        expect(count).toEqual(26);
    }

}