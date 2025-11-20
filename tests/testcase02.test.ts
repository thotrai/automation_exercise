import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import DeleteAccountPage from '@pages/deleteAccountPage'; 
import Header from '@components/header';
import * as data from '../test-data/users.json'; 

test('Test Case 2: Login User with correct email and password', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const deleteAccountPage = new DeleteAccountPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(data.email, data.password); // create new inputs
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(data.name); // create new input
    await header.clickDeleteAccount();

    await deleteAccountPage.expectAccountDeleted();
    
});