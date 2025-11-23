import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetailsPage from '@pages/productDetailsPage';
import Header from '@components/header';
import { products } from '../test-data/products';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);
    // Blue Top
    const product = products.blueTop;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.clickViewProductByName(product.name);

    await productDetailsPage.expectProductDetailsPageToBeVisible(product.id);
    await productDetailsPage.expectProductDetails(product);

});