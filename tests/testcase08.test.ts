import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetails1Page from '@pages/productDetails1Page';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetails1Page = new ProductDetails1Page(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // first product
    await productsPage.clickViewProduct(1);

    await productDetails1Page.expectProductDetails1PageToBeVisible();
    await productDetails1Page.expectProductDetailsToBeVisible();

});