import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import CartPage from '@pages/cartPage';
import * as data from '../test-data/users.json'; 

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickCart();

    await cartPage.expectCartPageToBeVisible();

    await page.locator('#footer').scrollIntoViewIfNeeded();

    await cartPage.subscribe(data.email);
    await cartPage.expectSubscriptionMesssageToBeVisible();

});