import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 

test('Test Case 5: Register User with existing email', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeNameAndEmail("ExistingUser", "test@mail.com"); 
    await loginPage.clickSignupButton();
    await loginPage.errorExistingEmail();

});