import { Page, expect } from "@playwright/test";

export default class Footer {

    constructor(public page: Page) {};

    async expectSubscriptionToBeVisible() {
        expect(this.page.getByText('Subscription')).toBeVisible();
    }

    async scrollToFooter() {
        await this.page.locator('#footer').scrollIntoViewIfNeeded();
    }

    async subscribe(email: string) {
        await this.page.locator(`//input[@id='susbscribe_email']`).type(email);
        await this.page.click(`//button[@id='subscribe']`);
    }

    async expectSubscriptionMesssageToBeVisible() {
        expect(this.page.locator(`//div[@id='success-subscribe']`)).toBeVisible();
        expect(this.page.locator(`//div[@id='success-subscribe']`)).toContainText('You have been successfully subscribed!');
    }

}