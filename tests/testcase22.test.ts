import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage';
import CartPage from '@pages/cartPage';

// not readdy yet
test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await homePage.scrollToBottom();

    await homePage.expectRecommendedItemsToBeVisible();
    await homePage.clickAddToCart();

    await productsPage.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    //await cartPage.expectRandomProductInCart();

});