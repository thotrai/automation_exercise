import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ContactPage from '@pages/contactPage'; 
import Header from '@components/header';
import { users } from '../test-data/users';

test('Test Case 6: Contact Us Form', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const contactPage = new ContactPage(page); 
    const header = new Header(page);

    const user = users.validUser;
    const subject: string = "Test Case 06";
    const message: string = "This is a test message.";

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickContactUs();

    await page.waitForTimeout(3000);
    await contactPage.expectContactPageToBeVisiable();
    await contactPage.fillNameEmailSubjectMessage(user.name, user.email, subject, message);
    await contactPage.uploadFile();

    // confirm dialog
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press OK');
        await dialog.accept();
    });

    await contactPage.clickSubmitButton();

    await contactPage.expectSuccessMessageToBeVisible();
    await contactPage.clickHomeButton();

    await homePage.expectHomePageToBeVisible();

});