import { Page, Locator, expect } from "@playwright/test";

export default class Header {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly testCasesLink: Locator;
    readonly contactUsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
        this.testCasesLink = page.getByRole('link', { name: 'Test Cases' }).first();
        this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
    };

    async clickHome() {
        await this.homeLink.click();
    }

    async clickProducts() {
        await this.productsLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }
    
    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
    }

    async clickTestCases() {
        await this.testCasesLink.click();
    }

    async clickContactUs() {
        await this.contactUsLink.click();
    }

    async expectLoggedInAs(name: string) {
        await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
    }

}