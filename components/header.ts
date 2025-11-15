import { Page, expect } from "@playwright/test";

export default class Header {

    constructor(public page: Page) {};

    async clickHome() {
        await this.page.getByRole('link', { name: 'Home' }).click();
    }

    async clickProducts() {
        await this.page.click(`//a[@href='/products']`);
    }

    async clickCart() {
        await this.page.click(`//a[@href='/view_cart']`);
    }
    
    async clickSignupLogin() {
        await this.page.click(`//a[@href='/login']`);
    }

    async clickLogout() {
        await this.page.click(`//a[@href='/logout']`);
    }

    async clickDeleteAccount() {
        await this.page.click(`//a[@href='/delete_account']`);
    }

    async clickTestCases() {
        await this.page.click(`//a[@href='/test_cases']`);
    }

    async clickContactUs() {
        await this.page.click(`//a[@href='/contact_us']`);
    }

    async expectLoggedInAs(name: string) {
        await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
    }

}