import { test, expect } from '@playwright/test';

test('API 1: Get All Products List', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
    const json = await response.json();
    console.log(json);
    
    // Verify status code
    expect(response.status()).toBe(200);

    // Basic structure validation
    expect(json).toHaveProperty('products');
    expect(Array.isArray(json.products)).toBeTruthy();
    expect(json.products.length).toBeGreaterThan(0);

    // Validate the number of products
    const count = json.products.length; 
    expect(count).toEqual(34);

    // Validate first product fields
    const first = json.products[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('brand');
    
});