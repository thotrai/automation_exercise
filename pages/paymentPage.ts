import { Page, expect } from '@playwright/test';

export default class PaymentPage {

    constructor(public page: Page) {};
    
    async expectPaymentPageToBeVisibe() {
        await expect(this.page).toHaveURL('/payment');
        await expect(this.page.locator('li:has-text("Payment")')).toBeVisible();
    }

    async typeNameOnCard(name: string) {
        await this.page.locator('input[name="name_on_card"]').type(name);
    }

    async typeCardNumber(number: string) {
        await this.page.locator('input[name="card_number"]').type(number);
    }
    async typeCVC(cvc: string) {
        await this.page.locator('input[name="cvc"]').type(cvc);
    }
    async typeExpirationDate(month: string, year: string) {
        await this.page.locator('input[name="expiry_month"]').type(month);
        await this.page.locator('input[name="expiry_year"]').type(year);
    }

    async clickPayAndConfirmOrder() {
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }

    // something is wrong with the redirection of the page
    async expectSuccessMessage() {
        await expect(this.page.getByText(' Your order has been placed successfully! ')).toBeVisible();
    }

}
