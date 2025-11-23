import { test } from '@playwright/test'; 
import HomePage from '@pages/homePage'; 
import ProductsPage from '@pages/productsPage'; 
import ProductDetailsPage from '@pages/productDetailsPage';
import Header from '@components/header';
import { users } from '@test-data/users';

test('Test Case 21: Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);

    const user = users.validUser;
    const review: string = 'This is a five starts review!';

    await homePage.navigate();
    await homePage.expectHomePageToBeVisible();
    await header.clickProducts();

    await productsPage.expectProductsPageToBeVisible();
    await productsPage.clickViewProduct(1);
    
    await productDetailsPage.expectProductDetailsPageToBeVisible(1);
    await productDetailsPage.expectReviwToBeVisible();
    await productDetailsPage.typeReview(user.name, user.email, review);
    await productDetailsPage.clickSubmit();
    await productDetailsPage.successMessage();
    
});