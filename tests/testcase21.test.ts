import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetailsPage from '@pages/productDetailsPage';
import Header from '@components/header';
import * as data from '../test-data/users.json'; 

test('Test Case 21: Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.clickViewProduct(1);
    
    await productDetailsPage.expectProductDetailsPageToBeVisible(1);
    await productDetailsPage.expectReviwToBeVisible();
    await productDetailsPage.typeReview(data.name, data.email, 'This is a five starts review!');
    await productDetailsPage.clickSubmit();
    await productDetailsPage.successMessage();
    
});