import { Page, expect } from "@playwright/test";

export default class SignupPage {

    constructor(public page: Page) {}

    async expectLoginPageToBeVisible() {
        expect(this.page).toHaveURL('signup');
        expect(this.page.locator(`//b[normalize-space()='Enter Account Information']`)).toBeVisible();
    }

    async fillAccountInformation(password: string, day: string, month: string, year: string) {
        const titleRadioButton = await this.page.locator(`//input[@id='id_gender1']`);
        await titleRadioButton.check();
        await expect(titleRadioButton).toBeChecked();

        await this.page.locator(`//input[@id='password']`).type(password);

        await this.page.selectOption('#days', day);
        await this.page.selectOption('#months', month);
        await this.page.selectOption('#years', year);
    }

    async checkNewsletterAndOffers() {
        const newsletterCheckbox = await this.page.locator(`//input[@id='newsletter']`);
        newsletterCheckbox.click();
        await expect(newsletterCheckbox).toBeChecked();

        const offersCheckbox = await this.page.locator(`//input[@id='optin']`);
        offersCheckbox.click();
        await expect(offersCheckbox).toBeChecked();
    }

    async fillAddressInformation(firstName: string, lastName: string, address: string, country: string, state: string, city: string, zipcode: string, mobile: string) {
        await this.page.locator(`//input[@id='first_name']`).type(firstName);
        await this.page.locator(`//input[@id='last_name']`).type(lastName);
        await this.page.locator(`//input[@id='address1']`).type(address);
        await this.page.selectOption('#country', country);
        await this.page.locator(`//input[@id='state']`).type(state);
        await this.page.locator(`//input[@id='city']`).type(city);
        await this.page.locator(`//input[@id='zipcode']`).type(zipcode);
        await this.page.locator(`//input[@id='mobile_number']`).type(mobile);
    }

    async clickCreateAccount() {
        await this.page.getByRole('button', { name: 'Create Account'}).click();
    }

}