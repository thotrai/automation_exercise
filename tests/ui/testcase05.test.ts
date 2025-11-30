import { test } from '@fixtures/apiUserFixture';
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import Header from '@components/header';

test('Test Case 5: Register User with existing email', async ({ page, user }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();
    
    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillNameAndEmail(user.name, user.email); 
    await loginPage.clickSignupButton();
    await loginPage.expectErrorExistingEmailToBeVisible();

});