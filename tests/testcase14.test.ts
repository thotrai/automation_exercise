import { test, expect } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await homePage.clickAddToCart();
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();

});