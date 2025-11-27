import { test, expect } from "@playwright/test";

test('API 9: DELETE To Verify Login', async ({ request }) => {
    const response = await request.delete('https://automationexercise.com/api/verifyLogin')
    const json = await response.json();
    console.log(json);

    // The API incorrectly returns 200
    expect(response.status()).toBe(200);

    // Validate the actual API response error
    expect(json.responseCode).toBe(405);
    expect(json.message).toContain('This request method is not supported.');

});