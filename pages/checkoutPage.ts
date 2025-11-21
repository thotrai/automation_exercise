import { Page, Locator, expect } from '@playwright/test';
import { Address } from '../types/Address';

export default class CheckoutPage {
    readonly page: Page;
    readonly deliveryAddressBox: Locator;
    readonly invoiceAddressBox: Locator;
    readonly orderMessageInput: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryAddressBox = page.locator('#address_delivery');
        this.invoiceAddressBox = page.locator('#address_invoice');
        this.orderMessageInput = page.locator('[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }
    
    async expectCheckoutPageToBeVisibe() {
        await expect(this.page).toHaveURL('/checkout');
        await expect(this.page.getByText('Checkout')).toBeVisible();
    }

    async expectAddressSectionToBeVisible() {
        await expect(this.deliveryAddressBox).toBeVisible();
        await expect(this.invoiceAddressBox).toBeVisible();
    }

    async expectReviewYourOrderToBeVisible() {
        await expect(this.page.getByText('Review Your Order')).toBeVisible();
    }

    async expectOrderMessageBeVisible() {
        await expect(this.orderMessageInput).toBeVisible();
    }

    async typeOrderMessage(message: string) {
        await this.orderMessageInput.fill(message);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }

    async expectDeliveryAddressToMatch(expected: Address) {
      await expect(this.deliveryAddressBox).toContainText(expected.firstName);
      await expect(this.deliveryAddressBox).toContainText(expected.lastName);
      if (expected.company) {
        await expect(this.deliveryAddressBox).toContainText(expected.company);
      }
      await expect(this.deliveryAddressBox).toContainText(expected.address1);
      if (expected.address2) {
        await expect(this.deliveryAddressBox).toContainText(expected.address2);
      }
      await expect(this.deliveryAddressBox).toContainText(expected.city);
      await expect(this.deliveryAddressBox).toContainText(expected.state);
      await expect(this.deliveryAddressBox).toContainText(expected.zipcode);
      await expect(this.deliveryAddressBox).toContainText(expected.country);
      await expect(this.deliveryAddressBox).toContainText(expected.mobileNumber);
    }

    async expectInvoiceAddressToMatch(expected: Address) {
      await expect(this.invoiceAddressBox).toContainText(expected.firstName);
      await expect(this.invoiceAddressBox).toContainText(expected.lastName);
      if (expected.company) {
        await expect(this.deliveryAddressBox).toContainText(expected.company);
      }
      await expect(this.invoiceAddressBox).toContainText(expected.address1);
      if (expected.address2) {
        await expect(this.invoiceAddressBox).toContainText(expected.address2);
      }
      await expect(this.invoiceAddressBox).toContainText(expected.city);
      await expect(this.invoiceAddressBox).toContainText(expected.state);
      await expect(this.invoiceAddressBox).toContainText(expected.zipcode);
      await expect(this.invoiceAddressBox).toContainText(expected.country);
      await expect(this.invoiceAddressBox).toContainText(expected.mobileNumber);
    }

}