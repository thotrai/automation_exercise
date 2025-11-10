import { test, expect } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ContactPage from '@pages/contactPage'; 
import * as data from '../test-data/users.json'; 

test('Test Case 6: Contact Us Form', async ({ page }) => { 
    const homePage = new HomePage(page); 
    const contactPage = new ContactPage(page); 

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await homePage.clickContactUs();

    await page.waitForTimeout(2000);
    await contactPage.expectContactPageToBeVisiable();
    await contactPage.typeNameEmailSubjectMessage(data.name, data.email, "Test", "This is a test message.");
    await contactPage.uploadFile();

    // confirm dialog
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press OK');
        await dialog.accept();
    });

    await contactPage.clickSubmitButton();

    await contactPage.successMessage();
    await contactPage.clickHomeButton();

    await homePage.expectHomePageToBeVisible();

});