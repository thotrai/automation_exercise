import { Locator, Page, expect } from "@playwright/test";

export default class Footer {
    readonly page: Page;
    readonly footer: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscribeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator('#footer');
        this.emailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = page.locator('#subscribe');
        this.subscribeMessage = page.getByText('You have been successfully subscribed!');

    };

    async expectSubscriptionToBeVisible() {
        expect(this.page.getByText('Subscription')).toBeVisible();
    }

    async scrollToFooter() {
        await this.footer.scrollIntoViewIfNeeded();
    }

    async subscribe(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async expectSubscriptionMesssageToBeVisible() {
        expect(this.subscribeMessage).toBeVisible();
    }

}