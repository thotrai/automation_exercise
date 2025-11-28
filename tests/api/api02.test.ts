import { test, expect } from '@playwright/test';

test('API 2: POST To All Products List', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/productsList', {
        data: {
            dummyData: "test" 
        }
    });
    const json = await response.json();
    console.log(json);
    
    // The API incorrectly returns 200
    expect(response.status()).toBe(200);

    // Validate the actual API response error
    expect(json.responseCode).toBe(405);
    expect(json.message).toBe('This request method is not supported.');
    
});