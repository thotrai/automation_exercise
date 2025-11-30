import { test } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import CheckoutPage from '@pages/checkoutPage';
import CheckoutModal from '@components/checkoutModal';
import LoginPage from '@pages/loginPage';
import SignupPage from '@pages/signupPage';
import AccountPage from '@pages/accountPage';
import DeleteAccountPage from '@pages/deleteAccountPage';
import PaymentPage from '@pages/paymentPage';
import PaymentDonePage from '@pages/paymentDonePage';
import Header from '@components/header';
import { products } from '@test-data/products';
import { users } from '@test-data/users';
import { addresses } from '@test-data/addresses';
import { creditCards } from '@test-data/creditCards';

test('Test Case 15: Place Order: Login before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutModal = new CheckoutModal(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    const paymentPage = new PaymentPage(page);
    const paymentDonePage = new PaymentDonePage(page);
    const header = new Header(page);

    const product = products.blueTop;
    const user = users.validUser;
    const address = addresses.address1;
    const creditCard = creditCards.visa;
    const message = 'This is a message for my order!';

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
    //await paymentPage.expectSuccessMessage();

    await paymentDonePage.expectPaymentDonePageToBeVisible();
    await paymentDonePage.expectCongratulationsMessageToBeVisible();
    await paymentDonePage.clickContinue();

    await homePage.expectHomePageToBeVisible();
    await header.clickDeleteAccount(); 

    await deleteAccountPage.expectAccountDeleted();
    await deleteAccountPage.clickContinue();

    await homePage.expectHomePageToBeVisible();

});