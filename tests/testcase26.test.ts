import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 

test(`Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality`, async ({ page }) => { 
    const homePage = new HomePage(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await homePage.scrollToBottom();
    await homePage.expectSubscriptionToBeVisible();
    
    await page.waitForTimeout(500); 
    
    await homePage.scrollToTop();
    await homePage.expectFullFledgedTextToBeVisible();

});