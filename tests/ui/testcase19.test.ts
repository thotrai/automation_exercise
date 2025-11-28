import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import Sidebar from '@components/sidebar';
import Header from '@components/header';
import BrandProductsPage from '@pages/brandProductsPage copy';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const sidebar = new Sidebar(page);
    const header = new Header(page);
    const brandProductsPage = new BrandProductsPage(page);

    let brand = 'Polo';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();

    await sidebar.expectBrandsToBeVisible();
    
    await sidebar.clickBrand(brand);
    await brandProductsPage.expectBrandProductsPageToBeVisible(brand);
    await brandProductsPage.expectBrandHeaderToContain(brand);
    await brandProductsPage.expectProductsToBeDisplayed();
    
    brand = 'Madame';
    await sidebar.clickBrand(brand);
    await brandProductsPage.expectBrandProductsPageToBeVisible(brand);
    await brandProductsPage.expectBrandHeaderToContain(brand);
    await brandProductsPage.expectProductsToBeDisplayed();

});