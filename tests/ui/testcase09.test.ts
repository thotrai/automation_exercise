import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import Header from '@components/header';

test('Test Case 9: Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const header = new Header(page);

    const product = 'Pink';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.searchProduct(product);
    await productsPage.expectSearchedProductsToBeVisible(product);
    
});