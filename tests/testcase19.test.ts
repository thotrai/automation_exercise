import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import SidebarPage from '@pages/sidebarPage';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const sidebarPage = new SidebarPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();

    await sidebarPage.expectBrandsToBeVisible();
    // search for Polo
    await sidebarPage.clickBrand('Polo');
    await sidebarPage.expectBrandHeaderToContain('Brand - Polo Products');
    // search for Madame
    await sidebarPage.clickBrand('Madame');
    await sidebarPage.expectBrandHeaderToContain('Brand - Madame Products');

});