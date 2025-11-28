import { test } from '@fixtures/userFixture'; 
import HomePage from '@pages/homePage'; 
import LoginPage from '@pages/loginPage'; 
import Header from '@components/header';

test('Test Case 4: Logout User', async ({ page,  user }) => { 
    const homePage = new HomePage(page); 
    const loginPage = new LoginPage(page); 
    const header = new Header(page);

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(user.email, user.password); //
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(user.name); //
    await header.clickLogout();

    await loginPage.expectLoginPageToBeVisible();
    
});