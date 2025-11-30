import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import Scrolling from '@utils/scrolling';

test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const scrolling = new Scrolling(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await scrolling.scrollToBottom();

    await homePage.expectRecommendedItemsToBeVisible();
    await homePage.freezeCarousel();

    const product = await homePage.getRecommendedProductInfo();
    await homePage.clickAddToCartRecommendedProduct();
    
    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCart(product);

});