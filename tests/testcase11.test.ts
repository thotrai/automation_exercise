import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import CartPage from '@pages/cartPage';
import Footer from '@components/footer';
import Header from '@components/header';
import { users } from '../test-data/users'; 

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const footer = new Footer(page);
    const header = new Header(page);

    const user = users.validUser;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickCart();

    await cartPage.expectCartPageToBeVisible();

    await footer.scrollToFooter();

    await footer.subscribe(user.email);
    await footer.expectSubscriptionMesssageToBeVisible();

});