import { Page, Locator, expect } from "@playwright/test";

export default class ContactPage {
    readonly page: Page;
    readonly textGetInTouch: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textGetInTouch = this.page.getByText('GET IN TOUCH');
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
        this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
        this.submitButton = page.getByRole('button', { name: 'submit'});
        this.successMessage = page.locator(`//div[@class='status alert alert-success']`);
        this.homeButton = page.locator('a.btn.btn-success');
    }

    async expectContactPageToBeVisiable() {
        await expect(this.page).toHaveURL('contact_us');
        await expect(this.textGetInTouch).toBeVisible();
    }

    async fillNameEmailSubjectMessage(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async uploadFile() {
        await this.page.setInputFiles(`//input[@name='upload_file']`, 'upload-files/blank_file.pdf');
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async clickHomeButton() {
        await this.homeButton.click();
    }

    async expectSuccessMessageToBeVisible() {
        expect(this.successMessage).toBeVisible();
    }
}