import { test, expect } from '@playwright/test';

test('API 5: POST To Search Product', async ({ request }) => {
    const searchedProduct = 'Jeans';

    const response = await request.post('https://automationexercise.com/api/searchProduct', {
            form: {
                search_product: searchedProduct
            }
        }
    );
    const json = await response.json();
    console.log(json);
    
    // Verify status code
    expect(response.status()).toBe(200);

    // Vadidate searched products
    for (const product of json.products) {
        const name = product.name;
        expect(name).toContain(searchedProduct);
    }
    
});