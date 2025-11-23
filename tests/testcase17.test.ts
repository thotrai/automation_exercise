import { test } from '@playwright/test';
import HomePage from '@pages/homePage';
import CartModal from '@components/cartModal';
import CartPage from '@pages/cartPage';
import { products } from '@test-data/products';

test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartModal = new CartModal(page);
    const cartPage = new CartPage(page);

    const product = products.blueTop;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();

    await homePage.addProductToCartByName(product.name)
    
    await cartModal.clickViewCart();

    await cartPage.expectCartPageToBeVisible();
    await cartPage.removeItem(product.name);
    await cartPage.expectCartIsEmptyToBeVisible();

});