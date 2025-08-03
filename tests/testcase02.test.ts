import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import AccountPage from '@pages/accountPage'; 
import * as data from '../test-data/users.json'; 

test('Test Case 2: Login User with correct email and password', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const accountPage = new AccountPage(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeEmailAndPassword(data.email, data.password); // create new inputs
    await loginPage.clickLoginButton();

    await homePage.expectLoggedInAs(data.email); // create new input
    await homePage.clickDeleteAccount();

    await accountPage.expectAccountDeleted();
    
});