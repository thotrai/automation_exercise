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

    async expectDeliveryAddressToMatch(expectedAddress: any) {
        const deliveryBox = this.page.locator('#address_delivery');

        await expect(deliveryBox).toContainText(expectedAddress.firstName);
        await expect(deliveryBox).toContainText(expectedAddress.lastName);
        await expect(deliveryBox).toContainText(expectedAddress.address1);
        await expect(deliveryBox).toContainText(expectedAddress.city);
        await expect(deliveryBox).toContainText(expectedAddress.state);
        await expect(deliveryBox).toContainText(expectedAddress.zipcode);
        await expect(deliveryBox).toContainText(expectedAddress.country);
        await expect(deliveryBox).toContainText(expectedAddress.mobileNumber);
    }

    async expectBillingAddressToMatch(expectedAddress: any) {
        const billingAddress = this.page.locator('#address_invoice');

        await expect(billingAddress).toContainText(expectedAddress.firstName);
        await expect(billingAddress).toContainText(expectedAddress.lastName);
        await expect(billingAddress).toContainText(expectedAddress.address1);
        await expect(billingAddress).toContainText(expectedAddress.city);
        await expect(billingAddress).toContainText(expectedAddress.state);
        await expect(billingAddress).toContainText(expectedAddress.zipcode);
        await expect(billingAddress).toContainText(expectedAddress.country);
        await expect(billingAddress).toContainText(expectedAddress.mobileNumber);
    }

    // needs improvement
    async expectReviewYourOrderToBeVisible() {
        await expect(this.page.getByText('Review Your Order')).toBeVisible();
    }

    async expectOrderMessageBeVisible() {
        await expect(this.page.locator('#ordermsg')).toBeVisible();
    }

    async typeMessage(message: string) {
        await this.page.locator('[name="message"]').type(message);
    }

    async clickPlaceOrder() {
        await this.page.getByRole('link', { name: 'Place Order' }).click();
    }

}