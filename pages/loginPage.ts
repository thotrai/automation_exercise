import { Page, Locator, expect } from "@playwright/test"; 

export default class LoginPage {
    readonly page: Page;
    readonly loginEmailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly nameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly errorInvalidCredentials: Locator;
    readonly errorExistingEmail: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmailInput = page.getByRole('textbox', { name: 'Email Address' }).nth(0);
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.signupEmailInput = page.getByRole('textbox', { name: 'Email Address' }).nth(1);
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.errorInvalidCredentials = page.getByText('Your email or password is incorrect!');
        this.errorExistingEmail = page.getByText('Email Address already exist!');
    }

    async expectLoginPageToBeVisible() {
        await expect(this.page).toHaveURL('login');
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    async fillNameAndEmail(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton() {
        await this.signupButton.click();
    }

    async fillEmailAndPassword(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async expectErrorInvalidEmailOrPasswordToBeVisible() {
        expect(this.errorInvalidCredentials).toBeVisible();
    }

    async expectErrorExistingEmailToBVisible() {
        expect(this.errorExistingEmail).toBeVisible();
    }

}