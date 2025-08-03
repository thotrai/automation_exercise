import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import CartPage from '@pages/cartPage';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // add first product
    await productsPage.hoverOnProduct(1);
    await productsPage.clickAddToCartProduct(1);
    await productsPage.clickContinueShopping();
    // add second product
    await productsPage.hoverOnProduct(2);
    await productsPage.clickAddToCartProduct(2);
    await productsPage.clickViewCart();
    
    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductInCart(1);
    await cartPage.expectProductInCart(2);

    await cartPage.verifyCartItemDetails(1, '500', '1', '500');
    await cartPage.verifyCartItemDetails(2, '400', '1', '400');
    
});