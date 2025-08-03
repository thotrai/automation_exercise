import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import SidebarPage from '@pages/sidebarPage';

test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebarPage = new SidebarPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await sidebarPage.expectCategoryToBeVisible();
    // Search for Women and Dress
    await sidebarPage.clickCategory('Women', 'Dress');
    await sidebarPage.expectCategoryHeaderToContain('Women - Dress Products');
    // Search for Men and Jeans
    await sidebarPage.clickCategory('Men', 'Jeans');
    await sidebarPage.expectCategoryHeaderToContain('Men - Jeans Products');

});