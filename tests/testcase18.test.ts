import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Sidebar from '@components/sidebar';

test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new Sidebar(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await sidebar.expectCategoryToBeVisible();
    // Search for Women and Dress
    await sidebar.clickCategory('Women', 'Dress');
    await sidebar.expectCategoryHeaderToContain('Women - Dress Products');
    // Search for Men and Jeans
    await sidebar.clickCategory('Men', 'Jeans');
    await sidebar.expectCategoryHeaderToContain('Men - Jeans Products');

});