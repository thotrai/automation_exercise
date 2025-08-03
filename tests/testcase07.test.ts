import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import TestCasesPage from '@pages/testCasesPage'; 

test('Test Case 7: Verify Test Cases Page', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const testCasesPage = new TestCasesPage(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickTestCases();

    await testCasesPage.expectTestCasesPageToBeVisible();
    await testCasesPage.countTestCases();

});