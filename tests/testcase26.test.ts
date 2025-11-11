import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Scrolling from '@utils/scrolling';
import Subscription from '@components/subscription';

test(`Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality`, async ({ page }) => { 
    const homePage = new HomePage(page);
    const scrolling = new Scrolling(page); 
    const subscription = new Subscription(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await scrolling.scrollToBottom();
    await subscription.expectSubscriptionToBeVisible();
    
    await page.waitForTimeout(500); 
    
    await scrolling.scrollToTop();
    await homePage.expectFullFledgedTextToBeVisible();

});