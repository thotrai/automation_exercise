import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Subscription from '@components/subscription';
import * as data from '../test-data/users.json'; 

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const subscription = new Subscription(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await subscription.scrollToFooter();

    await subscription.subscribe(data.email);
    await subscription.expectSubscriptionMesssageToBeVisible();

});