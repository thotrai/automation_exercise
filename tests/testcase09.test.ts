import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 

test('Test Case 9: Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // search for 'Top' products
    await productsPage.searchProduct('Top');
    await productsPage.expectSearchedProductsToBeVisible('Top');
    
});