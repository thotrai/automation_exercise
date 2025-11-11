import { Page, expect } from "@playwright/test";

export default class Scrolling {

    constructor(public page: Page) {};
    
    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await this.page.waitForFunction(() => window.scrollY === 0);
    }

}