import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import Sidebar from '@components/sidebar';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const sidebar = new Sidebar(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickProducts();

    await productsPage.expectProductsPageToBeVisible();

    await sidebar.expectBrandsToBeVisible();
    // search for Polo
    await sidebar.clickBrand('Polo');
    await sidebar.expectBrandHeaderToContain('Brand - Polo Products');
    // search for Madame
    await sidebar.clickBrand('Madame');
    await sidebar.expectBrandHeaderToContain('Brand - Madame Products');

});