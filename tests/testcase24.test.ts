import { test, expect } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import CheckoutModal from '@components/checkoutModal';
import LoginPage from '@pages/loginPage';
import SignupPage from '@pages/signupPage';
import AccountPage from '@pages/accountPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import PaymentPage from '@pages/paymentPage';
import PaymentDonePage from '@pages/paymentDonePage';
import Header from '@components/header';

test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutModal = new CheckoutModal(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const paymentPage = new PaymentPage(page);
    const paymentDonePage = new PaymentDonePage(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    // Stylish Dress
    await homePage.hoverOnProduct(4);
    await homePage.clickAddToCartProduct(4); 
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();

    await checkoutModal.expectCheckoutModalToBeVisible();
    await checkoutModal.clickRegisterLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeNameAndEmail("UserTC24c","usertc24c@qmail.com"); // update
    await loginPage.clickSignupButton();

    await signupPage.expectLoginPageToBeVisible();
    await signupPage.fillAccountInformation("Test123@", "23", "10", "2000");
    await signupPage.checkNewsletterAndOffers();
    await signupPage.fillAddressInformation("User", "Testcase", "Street", "United States", "California", "Miami", "99999", "1234567890");
    await signupPage.clickCreateAccount();

    await accountPage.expectAccountCreated();
    await accountPage.clickContinue();

    await header.expectLoggedInAs("User");
    await header.clickCart();

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
    //await paymentPage.expectSuccessMessage();

    await paymentDonePage.expectPaymentDonePageToBeVisible();
    await paymentDonePage.expectCongratulationsMessageToBeVisible();
    await paymentDonePage.clickDownloadInvoice();
    await paymentDonePage.clickContinue();

    await homePage.expectHomePageToBeVisible();
    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});