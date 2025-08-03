import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import * as data from '../test-data/users.json'; 

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await page.locator('#footer').scrollIntoViewIfNeeded();

    await homePage.subscribe(data.email);
    await homePage.expectSubscriptionMesssageToBeVisible();

});