import { test, expect } from '@playwright/test';

test('API 4: PUT To All Brands List', async ({ request }) => {
    const response = await request.put('https://automationexercise.com/api/brandsList', {
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