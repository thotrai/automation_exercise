import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import Header from '@components/header';
import CartPage from '@pages/cartPage';
import CartModal from '@components/cartModal';
import LoginPage from '@pages/loginPage';

// it needs investigation 
test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const cartModal = new CartModal(page);
    const loginPage = new LoginPage(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // search for 'Jeans' product
    await productsPage.searchProduct('Jeans');
    await productsPage.expectSearchedProductsToBeVisible('Jeans');
    // add all the items to the cart 
    const count = await page.locator('.productinfo p').count();
    const selectedProducts = [];
    for (let i=1; i<=count; i++) {
        const info = await productsPage.getProductInfo(i);
        selectedProducts.push(info);
        await productsPage.clickAddToCart(i);
        await cartModal.clickContinueShopping();
    }

    await header.clickCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCart(selectedProducts);

    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.typeEmailAndPassword("usertc24a@qmail.com","Test123@"); // data existing user
    await loginPage.clickLoginButton();

    await homePage.expectHomePageToBeVisible();
    await header.expectLoggedInAs('UserTC24a'); // data existig user
    await header.clickCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCart(selectedProducts);

});