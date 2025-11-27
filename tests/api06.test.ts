import { test, expect } from '@playwright/test';

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct');
    const json = await response.json();
    console.log(json);
    
    // The API incorrectly returns 200
    expect(response.status()).toBe(200);

    // Validate the actual API response error
    expect(json.responseCode).toBe(400);
    expect(json.message).toBe('Bad request, search_product parameter is missing in POST request.');

});