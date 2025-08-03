import { Page, expect } from "@playwright/test"; 

export default class LoginPage {

    constructor(public page: Page) {}

    async expectLoginPageToBeVisible() {
        expect(this.page).toHaveURL('login');
        expect(this.page.locator(`//h2[normalize-space()='New User Signup!']`)).toBeVisible();
    }

    async typeNameAndEmail(name: string, email: string) {
        await this.page.locator(`//input[@name='name']`).type(name);
        await this.page.locator(`//form[@action='/signup']//input[@name='email']`).type(email);
    }

    async clickSignupButton() {
        await this.page.getByRole('button', { name: 'Signup' }).click();
    }

    async typeEmailAndPassword(email: string, password: string) {
        await this.page.locator(`//form[@action='/login']//input[@name='email']`).type(email);
        await this.page.locator(`//input[@name='password']`).type(password);
    }

    async clickLoginButton() {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async errorInvalidEmailOrPassword() {
        expect(this.page.locator(`//p[normalize-space()='Your email or password is incorrect!']`)).toBeVisible();
    }

    async errorExistingEmail() {
        expect(this.page.locator(`//p[normalize-space()='Email Address already exist!']`)).toBeVisible();
    }

}