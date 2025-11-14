import { test, expect } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';

test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await homePage.hoverOnProduct(1);
    await homePage.clickAddToCartProduct(1); 
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickXbutton();
    await cartPage.expectProductHasBeenRemoved(1);
    await cartPage.expectCartIsEmpty();

});