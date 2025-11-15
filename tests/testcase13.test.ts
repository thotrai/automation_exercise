import { test } from "@playwright/test";
import HomePage from "@pages/homePage";
import ProductsPage from "@pages/productsPage";
import ProductDetailsPage from "@pages/productDetailsPage";
import CartPage from "@pages/cartPage";
import CartModal from "@components/cartModal";
import Header from "@components/header";

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const cartModal = new CartModal(page);
    const header = new Header(page);

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    // view first product
    await productsPage.clickViewProduct(1);

    await productDetailsPage.expectProductDetailsPageToBeVisible(1);
    await productDetailsPage.increaseQuantityNTimes(4);
    await productDetailsPage.clickAddToCart();

    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductInCart(1);

    await cartPage.verifyCartItemDetails(1, '500', '4', '2000');

})