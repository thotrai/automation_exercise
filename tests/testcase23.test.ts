import { test } from '@playwright/test';
import { Address } from '../types/Address';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import LoginPage from '@pages/loginPage';
import SignupPage from '@pages/signupPage';
import AccountPage from '@pages/accountPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import Header from '@components/header';
import { users } from '@test-data/users';

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

    const user = users.validUser;

    const addressData: Address = {
        firstName: 'Test',
        lastName: 'Case',
        company: '',
        address1: 'Random Street 86',
        address2: 'Suite 10',
        city: 'California',
        state: 'Miami',
        zipcode: '12345',
        country: 'United States',
        mobileNumber: '1234567890',
    };

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillNameAndEmail(user.name, user.email); 
    await loginPage.clickSignupButton();

    await signupPage.expectSignupPageToBeVisible();
    await signupPage.selectTitle();
    await signupPage.fillPassword(user.password);
    await signupPage.selectBirthDay(user.day, user.month, user.year);
    await signupPage.checkNewsletterAndOffers();
    await signupPage.fillAddressInformation(addressData);
    const addressInformations = await signupPage.getAddressInfo();
    await signupPage.clickCreateAccount();

    await accountPage.expectAccountCreated();
    await accountPage.clickContinue();

    await header.expectLoggedInAs(user.name);
    // Blue Top
    await homePage.addProductToCart(); 
    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();  

    await checkoutPage.expectCheckoutPageToBeVisibe();
    await checkoutPage.expectAddressSectionToBeVisible();
    await checkoutPage.expectDeliveryAddressToMatch(addressInformations);
    await checkoutPage.expectInvoiceAddressToMatch(addressInformations);

    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});