import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import SignupPage from '@pages/signupPage'; 
import AccountPage from '@pages/accountPage'; 
import DeleteAccountPage from '@pages/deleteAccountPage';
import * as data from '../test-data/users.json'; 

test('Test Case 1: Register User', async ({ page }) => { 
  const homePage = new HomePage(page); 
  const loginPage = new LoginPage(page); 
  const signupPage = new SignupPage(page); 
  const accountPage = new AccountPage(page); 
  const deleteAccountPage = new DeleteAccountPage(page);

  await homePage.navigate();
  await homePage.expectHomePageToBeVisible();
  await homePage.clickSignupLogin();

  await loginPage.expectLoginPageToBeVisible();
  await loginPage.typeNameAndEmail(data.name, data.email); 
  await loginPage.clickSignupButton();

  await signupPage.expectLoginPageToBeVisible();
  await signupPage.fillAccountInformation(data.password, data.day, data.month, data.year);
  await signupPage.checkNewsletterAndOffers();
  await signupPage.fillAddressInformation(data.firstName, data.lastName, data.address, data.country, data.state, data.city, data.zipcode, data.mobile);
  await signupPage.clickCreateAccount();

  await accountPage.expectAccountCreated();
  await accountPage.clickContinue();

  await homePage.expectLoggedInAs(data.name); 
  await homePage.clickDeleteAccount(); 

  await deleteAccountPage.expectAccountDeleted();
  await deleteAccountPage.clickContinue();

  await homePage.expectHomePageToBeVisible();
});
