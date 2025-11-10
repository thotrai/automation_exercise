import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import CartPage from '@pages/cartPage';
import Subscription from '@components/subscription';
import * as data from '../test-data/users.json'; 

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const subscription = new Subscription(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickCart();

    await cartPage.expectCartPageToBeVisible();

    await subscription.scrollToFooter();

    await subscription.subscribe(data.email);
    await subscription.expectSubscriptionMesssageToBeVisible();

});