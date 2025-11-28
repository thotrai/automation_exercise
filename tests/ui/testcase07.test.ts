import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import TestCasesPage from '@pages/testCasesPage'; 
import Header from '@components/header';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const testCasesPage = new TestCasesPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickTestCases();

    await testCasesPage.expectTestCasesPageToBeVisible();
    await testCasesPage.countTestCases();

});