import { Page, expect } from '@playwright/test';

export default class CheckoutPage {

    constructor(public page: Page) {};
    
    async expectCheckoutPageToBeVisibe() {
        await expect(this.page).toHaveURL('/checkout');
        await expect(this.page.getByText('Checkout')).toBeVisible();
    }

    // needs improvement
    async expectAddressDetailsToBeVisible() {
        await expect(this.page.getByText('Address Details')).toBeVisible();
    }

    // needs improvement
    async expectReviewYourOrderToBeVisible() {
        await expect(this.page.getByText('Review Your Order')).toBeVisible();
    }

    async expectOrderMessageBeVisible() {
        expect(this.page.locator('#ordermsg')).toBeVisible();
    }

    async typeMessage(message: string) {
        await this.page.locator('[name="message"]').type(message);
    }

    async clickPlaceOrder() {
        await this.page.getByRole('link', { name: 'Place Order' }).click();
    }

}