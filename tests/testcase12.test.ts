import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import CartPage from '@pages/cartPage';
import CartModal from '@components/cartModal';
import Header from '@components/header';
import { products } from '../test-data/products';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const cartModal = new CartModal(page);
    const header = new Header(page);

    const product1 = products.blueTop;
    const product2 = products.menTshirt;

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.addProductToCartByName(product1.name);
    await cartModal.clickContinueShopping();
    await productsPage.addProductToCartByName(product2.name);
    await cartModal.clickViewCart();
    
    await cartPage.expectCartPageToBeVisible();
    await cartPage.expectProductsInCart({
        name: product1.name,
        price: product1.price,
        quantity: 1,
        total: product1.price
    });
    await cartPage.expectProductsInCart({
        name: product2.name,
        price: product2.price,
        quantity: 1,
        total: product2.price
    });
    
});