import { Page, expect } from "@playwright/test";

export default class ContactPage {

    constructor(public page: Page) {}

    async expectContactPageToBeVisiable() {
        await expect(this.page).toHaveURL('contact_us');
        await expect(this.page.locator(`//h2[normalize-space()='Get In Touch']`)).toBeVisible();
    }

    async typeNameEmailSubjectMessage(name: string, email: string, subject: string, message: string) {
        await this.page.locator(`//input[@name='name']`).type(name);
        await this.page.locator(`//input[@name='email']`).type(email);
        await this.page.locator(`//input[@name='subject']`).type(subject);
        await this.page.locator(`//textarea[@id='message']`).type(message);
    }

    async uploadFile() {
        await this.page.setInputFiles(`//input[@name='upload_file']`, 'upload-files/blank_file.pdf');
    }

    async clickSubmitButton() {
        await this.page.getByRole('button', { name: 'submit'}).click();
    }

    async clickHomeButton() {
        await this.page.click(`//span[normalize-space()='Home']`);
    }

    async successMessage() {
        expect(this.page.locator(`//div[@class='status alert alert-success']`)).toBeVisible();
    }
}