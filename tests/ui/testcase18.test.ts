import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Sidebar from '@components/sidebar';
import CategoryProductsPage from '@pages/categoryProductsPage';

test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new Sidebar(page);
    const categoryProductsPage = new CategoryProductsPage(page);

    let category = 'Women';
    let subcategory = 'Dress';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await sidebar.expectCategoryToBeVisible();
    await sidebar.clickCategory(category, subcategory);
    await categoryProductsPage.expectCategoryProductsPageToBeVisible();
    await categoryProductsPage.expectCategoryHeaderToContain(category, subcategory);
    await categoryProductsPage.expectProductsToBeDisplayed();

    category = 'Men';
    subcategory = 'Jeans';
    await sidebar.clickCategory(category, subcategory);
    await categoryProductsPage.expectCategoryProductsPageToBeVisible();
    await categoryProductsPage.expectCategoryHeaderToContain(category, subcategory);
    await categoryProductsPage.expectProductsToBeDisplayed();

});