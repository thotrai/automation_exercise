import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import SignupPage from '@pages/signupPage'; 
import AccountPage from '@pages/accountPage'; 
import DeleteAccountPage from '@pages/deleteAccountPage';
import Header from '@components/header';
import { Address } from '../types/Address';

test('Test Case 1: Register User', async ({ page }) => { 
  const homePage = new HomePage(page); 
  const loginPage = new LoginPage(page); 
  const signupPage = new SignupPage(page); 
  const accountPage = new AccountPage(page); 
  const deleteAccountPage = new DeleteAccountPage(page);
  const header = new Header(page);

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
  await loginPage.fillNameAndEmail("TestCase01", "testcase01@mail.com"); //
  await loginPage.clickSignupButton();

  await signupPage.expectSignupPageToBeVisible();
  await signupPage.selectTitle();
  await signupPage.fillPassword("Test123@"); //
  await signupPage.checkNewsletterAndOffers();
  await signupPage.fillAddressInformation(addressData);
  await signupPage.clickCreateAccount();

  await accountPage.expectAccountCreated();
  await accountPage.clickContinue();

  await header.expectLoggedInAs("TestCase01"); //
  await header.clickDeleteAccount(); 

  await deleteAccountPage.expectAccountDeleted();
  await deleteAccountPage.clickContinue();

  await homePage.expectHomePageToBeVisible();
  
});
