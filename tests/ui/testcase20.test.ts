import { test } from '@fixtures/userFixture'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import Header from '@components/header';
import CartPage from '@pages/cartPage';
import LoginPage from '@pages/loginPage';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page, user }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);

    const searchedProducts = 'Jeans';

    await header.clickHome();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.searchProduct(searchedProducts);
    await productsPage.expectSearchedProductsTitleToBeVisible();
    
    const selectedProducts = await productsPage.getAllSearchedProducts();
    await productsPage.addAllSearchedProductsToCart();

    await header.clickCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCartList(selectedProducts);

    await header.clickSignupLogin();

    await loginPage.expectLoginPageToBeVisible();
    await loginPage.fillEmailAndPassword(user.email, user.password); 
    await loginPage.clickLoginButton();

    await header.expectLoggedInAs(user.name);
    await header.clickCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCartList(selectedProducts);

});