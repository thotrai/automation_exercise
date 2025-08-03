import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetails1Page from '@pages/productDetails1Page';
import * as data from '../test-data/users.json'; 

test('Test Case 21: Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetails1Page = new ProductDetails1Page(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.clickViewProduct(1);
    
    await productDetails1Page.expectProductDetails1PageToBeVisible();
    await productDetails1Page.expectReviwToBeVisible();
    await productDetails1Page.typeReview(data.name, data.email, 'This is a five starts review!');
    await productDetails1Page.clickSubmit();
    await productDetails1Page.successMessage();
    
});