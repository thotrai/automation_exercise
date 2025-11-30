import { test } from '@fixtures/apiUserFixture'
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import DeleteAccountPage from '@pages/deleteAccountPage'; 
import Header from '@components/header';

test('Test Case 2: Login User with correct email and password', async ({ page, user }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const deleteAccountPage = new DeleteAccountPage(page); 
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(user.email, user.password);
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(user.name); 
    await header.clickDeleteAccount();

    await deleteAccountPage.expectAccountDeleted();
    
});