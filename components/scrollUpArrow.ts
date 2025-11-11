import { Page, expect } from "@playwright/test";

export default class ScrollUpArrow {

    constructor(public page: Page) {};

    async clickArrow() {
        await this.page.click('#scrollUp');
        await this.page.waitForFunction(() => window.scrollY === 0);
    }

}