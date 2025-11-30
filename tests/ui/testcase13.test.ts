import { test } from "@playwright/test";
import HomePage from "@pages/homePage";
import ProductsPage from "@pages/productsPage";
import ProductDetailsPage from "@pages/productDetailsPage";
import CartPage from "@pages/cartPage";
import CartModal from "@components/cartModal";
import Header from "@components/header";
import { products } from "@test-data/products";

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const cartModal = new CartModal(page);
    const header = new Header(page);

    const product = products.blueTop;
    const quantity: number = 4;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();

    await productsPage.clickViewProductByName(product.name);

    await productDetailsPage.expectProductDetailsPageToBeVisible(product.id);
    // Increase quantity to 4
    await productDetailsPage.increaseQuantity(quantity);
    await productDetailsPage.clickAddToCart();

    await cartModal.expectCartModalToBeVisible();
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductQuantity(product.name, quantity);

})