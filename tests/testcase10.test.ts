import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import Footer from '@components/footer';
import { users } from '@test-data/users';

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const footer = new Footer(page);
    // Invalid user
    const user = users.invalidUser;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await footer.scrollToFooter();

    await footer.subscribe(user.email);
    await footer.expectSubscriptionMesssageToBeVisible();

});