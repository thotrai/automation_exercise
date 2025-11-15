import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import Header from '@components/header';
import * as data from '../test-data/users.json'; 

test('Test Case 4: Logout User', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeEmailAndPassword(data.email, data.password); // create new inputs
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(data.name); // create new input
    await header.clickLogout();
    await loginPage.expectLoginPageToBeVisible();
    
});