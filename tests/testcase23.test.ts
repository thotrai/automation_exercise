import { test, expect } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import LoginPage from '@pages/loginPage';
import SignupPage from '@pages/signupPage';
import AccountPage from '@pages/accountPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import Header from '@components/header';

test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeNameAndEmail("UserTC23","usertc23@gmail.com"); // update
    await loginPage.clickSignupButton();

    await signupPage.expectLoginPageToBeVisible();
    await signupPage.fillAccountInformation("Test123@", "23", "10", "2000");
    await signupPage.checkNewsletterAndOffers();
    await signupPage.fillAddressInformation("User", "Testcase", "Street 86", "United States", "California", "Miami", "99999", "1234567890");
    const addressInformations = await signupPage.getAddressInfo();
    await signupPage.clickCreateAccount();

    await accountPage.expectAccountCreated();
    await accountPage.clickContinue();

    await header.expectLoggedInAs("User");
    // Blue Top
    await homePage.addProductToCart(); 
    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();  

    await checkoutPage.expectCheckoutPageToBeVisibe();
    await checkoutPage.expectAddressDetailsToBeVisible();
    await checkoutPage.expectDeliveryAddressToMatch(addressInformations);
    await checkoutPage.expectReviewYourOrderToBeVisible();
    await checkoutPage.expectBillingAddressToMatch(addressInformations);

    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});