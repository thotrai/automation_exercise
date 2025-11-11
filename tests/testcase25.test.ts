import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Scrolling from '@utils/scrolling';
import ScrollUpArrow from '@components/scrollUpArrow';
import Subscription from '@components/subscription';

test(`Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality`, async ({ page }) => { 
    const homePage = new HomePage(page);
    const scrolling = new Scrolling(page); 
    const scrollUpArrow = new ScrollUpArrow(page);
    const subscription = new Subscription(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await scrolling.scrollToBottom();
    await subscription.expectSubscriptionToBeVisible();
    
    await page.waitForTimeout(500); 

    await scrollUpArrow.clickArrow();
    await homePage.expectFullFledgedTextToBeVisible();

});