import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Footer from '@components/footer';
import * as data from '../test-data/users.json'; 

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const footer = new Footer(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await footer.scrollToFooter();

    await footer.subscribe(data.email);
    await footer.expectSubscriptionMesssageToBeVisible();

});