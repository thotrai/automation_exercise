import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetailsPage from '@pages/productDetailsPage';
import Header from '@components/header';
import { users } from '@test-data/users';
import { products } from '@test-data/products';

test('Test Case 21: Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);

    const product = products.menTshirt;
    const user = users.validUser;
    const review: string = 'This is a five starts review!';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.clickViewProductByName(product.name);
    
    await productDetailsPage.expectProductDetailsPageToBeVisible(product.id);
    await productDetailsPage.expectReviewToBeVisible();
    await productDetailsPage.fillReview(user.name, user.email, review);
    await productDetailsPage.clickSubmit();
    await productDetailsPage.expectSuccessMessageToBeVisible();
    
});