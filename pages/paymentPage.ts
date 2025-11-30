import { Page, Locator, expect } from '@playwright/test';

export default class PaymentPage {
    readonly page: Page;
    readonly textPayment: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textPayment = page.locator('h2:has-text("Payment")');
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvcInput = page.locator('input[name="cvc"]');
        this.expiryMonthInput = page.locator('input[name="expiry_month"]');
        this.expiryYearInput = page.locator('input[name="expiry_year"]');
        this.payAndConfirmOrderButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.successMessage = page.getByText('Your order has been placed successfully!', { exact: true });
    }
    
    async expectPaymentPageToBeVisibe() {
        await expect(this.page).toHaveURL('/payment');
        await expect(this.textPayment).toBeVisible();
    }

    async fillCreditCardInformation(name: string, number: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(month);
        await this.expiryYearInput.fill(year);
    }

    async clickPayAndConfirmOrder() {
        await this.payAndConfirmOrderButton.click();
    }

    // something is wrong with the redirection of the page
    async expectSuccessMessageToBeVisisble() {
        await expect(this.successMessage).toBeVisible();
    }

}
