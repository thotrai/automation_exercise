import { test as base } from '@playwright/test';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import SignupPage from '../pages/signupPage';
import AccountPage from '@pages/accountPage';
import Header from '../components/header';
import { createRandomUser } from '../utils/helperFunctions';
import { User } from '../types/User';
import { addresses } from '@test-data/addresses';

type Fixtures = {
    user: User;
}

// Greate a new user and logout
export const test = base.extend<Fixtures> ({
    user: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const accountPage = new AccountPage(page);
        const header = new Header(page);

        const user = createRandomUser();
        const address = addresses.address1;

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
        await header.clickLogout();

        await use(user);
    }
});