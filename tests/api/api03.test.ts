import { test, expect } from '@playwright/test';

test('API 3: Get All Brands List', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/brandsList');
    const json = await response.json();
    console.log(json);
    
    // Verify status code
    expect(response.status()).toBe(200);

    // Basic structure validation
    expect(json).toHaveProperty('brands');
    expect(Array.isArray(json.brands)).toBeTruthy();
    expect(json.brands.length).toBeGreaterThan(0);

    // Validate first product fields
    const first = json.brands[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('brand');
    
});