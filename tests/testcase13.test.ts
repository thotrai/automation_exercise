import { test } from "@playwright/test";
import HomePage from "@pages/homePage";
import ProductsPage from "@pages/productsPage";
import ProductDetails1Page from "@pages/productDetails1Page";
import CartPage from "@pages/cartPage";

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetails1Page = new ProductDetails1Page(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // view first product
    await productsPage.clickViewProduct(1);

    await productDetails1Page.expectProductDetails1PageToBeVisible();
    await productDetails1Page.increaseQuantityNTimes(4);
    await productDetails1Page.clickAddToCart();
    await productDetails1Page.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductInCart(1);

    await cartPage.verifyCartItemDetails(1, '500', '4', '2000');

})