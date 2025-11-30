import { test } from '@fixtures/apiUserFixture';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import LoginPage from '@pages/loginPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import PaymentPage from '@pages/paymentPage';
import PaymentDonePage from '@pages/paymentDonePage';
import Header from '@components/header';
import { products } from '@test-data/products';
import { creditCards } from '@test-data/creditCards'

test('Test Case 16: Place Order: Login before Checkout', async ({ page, user }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const loginPage = new LoginPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const paymentPage = new PaymentPage(page);
    const paymentDonePage = new PaymentDonePage(page);
    const header = new Header(page);

    const product = products.blueTop;
    const creditCard = creditCards.visa;
    const message = 'This is a message for my order!';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(user.email,user.password); 
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(user.name);

    await homePage.addProductToCartByName(product.name); 
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.clickProccedToCheckout();

     await checkoutPage.expectCheckoutPageToBeVisibe();
    await checkoutPage.expectAddressSectionToBeVisible();
    await checkoutPage.expectReviewYourOrderToBeVisible();
    await checkoutPage.expectOrderMessageBeVisible();
    await checkoutPage.typeOrderMessage(message);
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageToBeVisibe();
    await paymentPage.fillCreditCardInformation(creditCard.name, creditCard.number, creditCard.cvc, creditCard.month, creditCard.year);
    await paymentPage.clickPayAndConfirmOrder();
    // await paymentPage.expectSuccessMessageToBeVisisble();
    
    await paymentDonePage.expectPaymentDonePageToBeVisible();
    await paymentDonePage.expectCongratulationsMessageToBeVisible();
    await paymentDonePage.clickContinue();

    await homePage.expectHomePageToBeVisible();
    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});