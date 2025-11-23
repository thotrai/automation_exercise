import { Page, Locator, expect } from "@playwright/test";

export default class PaymentDonePage {
    readonly page: Page;
    readonly textOrderPlaced: Locator;
    readonly congratulationsMessage: Locator;
    readonly continueButton: Locator;
    readonly downloadInvoiceButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textOrderPlaced = page.getByText('ORDER PLACED!');
        this.congratulationsMessage = page.getByText(`Congratulations! Your order has been confirmed!`);
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' });
    }    

    async expectPaymentDonePageToBeVisible() {
        await expect(this.page).toHaveURL(new RegExp('/payment_done/\\d+$'));
        await expect(this.textOrderPlaced).toBeVisible();
    }

    async expectCongratulationsMessageToBeVisible() {
        await expect(this.congratulationsMessage).toBeVisible();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickDownloadInvoice() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadInvoiceButton.click(),
        ]);

        // Verify suggested filename is not empty
        const fileName = download.suggestedFilename();
        expect(fileName).not.toBe('');
        // Save the file
        await download.saveAs('./downloads/' + fileName);

        return fileName;
    }

}
