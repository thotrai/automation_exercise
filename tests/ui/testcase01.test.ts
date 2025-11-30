import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import SignupPage from '@pages/signupPage'; 
import AccountPage from '@pages/accountPage'; 
import DeleteAccountPage from '@pages/deleteAccountPage';
import Header from '@components/header';
import { users } from '../../test-data/users';
import { addresses } from '../../test-data/addresses';

test('Test Case 1: Register User', async ({ page }) => { 
  const homePage = new HomePage(page); 
  const loginPage = new LoginPage(page); 
  const signupPage = new SignupPage(page); 
  const accountPage = new AccountPage(page); 
  const deleteAccountPage = new DeleteAccountPage(page);
  const header = new Header(page);

  const address = addresses.address1;
  const user = users.validUser;

  await homePage.navigate();
  await homePage.expectHomePageToBeVisible();
  await header.clickSignupLogin();

  await loginPage.expectLoginPageToBeVisible();
  await loginPage.fillNameAndEmail(user.name, user.email); 
  await loginPage.clickSignupButton();

  await signupPage.expectSignupPageToBeVisible();
  await signupPage.selectTitle();
  await signupPage.fillPassword(user.password); 
  await signupPage.selectBirthDay(user.birth_date, user.birth_month, user.birth_year); 
  await signupPage.checkNewsletterAndOffers();
  await signupPage.fillAddressInformation(address);
  await signupPage.clickCreateAccount();

  await accountPage.expectAccountCreated();
  await accountPage.clickContinue();

  await header.expectLoggedInAs(user.name); 
  await header.clickDeleteAccount(); 

  await deleteAccountPage.expectAccountDeleted();
  await deleteAccountPage.clickContinue();

  await homePage.expectHomePageToBeVisible();
  
});
