import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import Header from '@components/header';

test('Test Case 5: Register User with existing email', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeNameAndEmail("ExistingUser", "test@mail.com"); 
    await loginPage.clickSignupButton();
    await loginPage.errorExistingEmail();

});