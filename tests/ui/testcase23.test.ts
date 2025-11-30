import { test } from '@fixtures/userFixture';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import LoginPage from '@pages/loginPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import Header from '@components/header';
import { products } from '@test-data/products';
import { addresses } from '@test-data/addresses';

test('Test Case 23: Verify address details in checkout page', async ({ page, user }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const loginPage = new LoginPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const header = new Header(page);

    const product = products.blueTop;

    await loginPage.fillEmailAndPassword(user.email, user.password); 
    await loginPage.clickLoginButton();
    
    await homePage.expectHomePageToBeVisible();
    await homePage.addProductToCartByName(product.name);
    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();  

    await checkoutPage.expectCheckoutPageToBeVisibe();
    await checkoutPage.expectAddressSectionToBeVisible();
    await checkoutPage.expectDeliveryAddressToMatch(addresses.address1);
    await checkoutPage.expectInvoiceAddressToMatch(addresses.address1);

    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});