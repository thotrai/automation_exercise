import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import Header from '@components/header';
import { users } from '../../test-data/users';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const header = new Header(page);

    const user = users.invalidUser;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(user.email, user.password); 
    await loginPage.clickLoginButton();
    await loginPage.expectErrorInvalidEmailOrPasswordToBeVisible();

});