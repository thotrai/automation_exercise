import { Page, expect } from "@playwright/test";

export default class PaymentDonePage {

    constructor(public page: Page) {}

    async expectPaymentDonePageToBeVisible() {
        await expect(this.page).toHaveURL('/payment_done/1500');
        await expect(this.page.getByText('Order Placed!')).toBeVisible();
    }

    async expectCongratulationsMessageToBeVisible() {
        await expect(this.page.getByText(`Congratulations! Your order has been confirmed!`)).toBeVisible();
    }

    async clickContinue() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

    async clickDownloadInvoice() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByRole('link', { name: 'Download Invoice' }).click(),
        ]);

        // Verify suggested filename is not empty
        const fileName = download.suggestedFilename();
        expect(fileName).not.toBe('');
        // Save the file
        await download.saveAs('./downloads/' + fileName);

        return fileName;
    }

}
