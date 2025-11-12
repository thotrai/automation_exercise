import { Page, expect } from "@playwright/test";

export default class PaymentDonePage {

    constructor(public page: Page) {}

    async expectPaymentDonePageToBeVisible() {
        expect(this.page).toHaveURL('payment_done');
        expect(this.page.getByText('Order Placed!')).toBeVisible();
    }

    async expectCongratulationsMessageToBeVisible() {
        expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
    }

    async clickContinue() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

    async clickDownloadInvoice() {
        await this.page.getByRole('link', { name: 'Download Invoice' }).click();
    }

}
