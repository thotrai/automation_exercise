import { test, expect } from "@playwright/test";

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            password: 'Test123@'
        }
    })
    const json = await response.json();
    console.log(json);

    // Verify status code
    expect(response.status()).toBe(200);

    // Validate the actual API response error
    expect(json.responseCode).toBe(400);
    expect(json.message).toContain('Bad request, email or password parameter is missing in POST request.');

});