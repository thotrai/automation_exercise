import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import Scrolling from '@utils/scrolling';

// not readdy yet
test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const scrolling = new Scrolling(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await scrolling.scrollToBottom();

    await homePage.expectRecommendedItemsToBeVisible();
    await homePage.clickAddToCart();

    await productsPage.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    //await cartPage.expectRandomProductInCart();

});