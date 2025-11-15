import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetailsPage from '@pages/productDetailsPage';
import Header from '@components/header';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // first product
    await productsPage.clickViewProduct(1);

    await productDetailsPage.expectProductDetailsPageToBeVisible(1);
    await productDetailsPage.expectName("Blue Top");
    await productDetailsPage.expectCategory("Tops");
    await productDetailsPage.expectPrice("Rs. 500");
    await productDetailsPage.expectAvailability("In Stock");
    await productDetailsPage.expectCondition("New");
    await productDetailsPage.expectBrand("Polo");

});