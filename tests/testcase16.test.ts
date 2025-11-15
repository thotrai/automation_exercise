import { test, expect } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import CheckoutModal from '@components/checkoutModal';
import LoginPage from '@pages/loginPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import PaymentPage from '@pages/paymentPage';
import PaymentDonePage from '@pages/paymentDonePage';
import Header from '@components/header';
import * as data from '../test-data/users.json'; 

test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutModal = new CheckoutModal(page);
    const loginPage = new LoginPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const paymentPage = new PaymentPage(page);
    const paymentDonePage = new PaymentDonePage(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeEmailAndPassword(data.email, data.password); // user
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(data.firstName); // user
    // Stylish Dress
    await homePage.hoverOnProduct(4);
    await homePage.clickAddToCartProduct(4); 
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();  

    await checkoutPage.expectCheckoutPageToBeVisibe();
    await checkoutPage.expectAddressDetailsToBeVisible();
    await checkoutPage.expectReviewYourOrderToBeVisible();
    await checkoutPage.expectOrderMessageBeVisible();
    await checkoutPage.typeMessage("This is a message for my order!");
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageToBeVisibe();
    await paymentPage.typeNameOnCard("User Testcase");
    await paymentPage.typeCardNumber("6011208800050000");
    await paymentPage.typeCVC("333");
    await paymentPage.typeExpirationDate("10", "2028");
    await paymentPage.clickPayAndConfirmOrder();
    await paymentPage.expectSuccessMessage();

    await paymentDonePage.expectPaymentDonePageToBeVisible();
    await paymentDonePage.expectCongratulationsMessageToBeVisible();
    await paymentDonePage.clickContinue();

    await homePage.expectHomePageToBeVisible();
    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});