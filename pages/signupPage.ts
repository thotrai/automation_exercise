import { Page, Locator, expect } from "@playwright/test";
import { Address } from "../types/Address";

export default class SignupPage {
    readonly page: Page;
    readonly titleMrRadioButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly passwordInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileInput: Locator;
    readonly newsletterCheckbox: Locator;
    readonly offersCheckbox: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleMrRadioButton = page.locator('#id_gender1');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.passwordInput = page.locator('#password');
        this.companyInput = page.locator('#company');
        this.address1Input = page.locator('#address1');
        this.address2Input = page.locator('#address2');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileInput = page.locator('#mobile_number');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.offersCheckbox = page.locator('#optin');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async selectTitle() {
        await this.titleMrRadioButton.check();
        await this.titleMrRadioButton.isChecked();
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectBirthDay(day: string, month: string, year: string) {
        await this.page.selectOption('#days', day);
        await this.page.selectOption('#months', month);
        await this.page.selectOption('#years', year);
    }

    async expectLoginPageToBeVisible() {
        await expect(this.page).toHaveURL('signup');
        await expect(this.page.locator(`//b[normalize-space()='Enter Account Information']`)).toBeVisible();
    }


    async checkNewsletterAndOffers() {
        await this.newsletterCheckbox.check();
        await this.newsletterCheckbox.isChecked();

        await this.offersCheckbox.check();
        await this.offersCheckbox.isChecked();
    }

    async fillAddressInformation(data: Address) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        if (data.company) await this.companyInput.fill(data.company);
        await this.address1Input.fill(data.address1);
        if (data.address2) await this.address2Input.fill(data.address2);
        await this.countrySelect.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileInput.fill(data.mobileNumber);
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }

    async getAddressInfo(): Promise<Address> {
        return {
            firstName: await this.firstNameInput.inputValue(),
            lastName: await this.lastNameInput.inputValue(),
            company: await this.companyInput.inputValue(),
            address1: await this.address1Input.inputValue(),
            address2: await this.address2Input.inputValue(),
            country: await this.countrySelect.inputValue(),
            state: await this.stateInput.inputValue(),
            city: await this.cityInput.inputValue(),
            zipcode: await this.zipcodeInput.inputValue(),
            mobileNumber: await this.mobileInput.inputValue()
        };
    }

}