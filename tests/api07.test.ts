import { test, expect } from "@playwright/test";

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'apitesting@mail.com',
            password: 'Test123@'
        }
    })
    const json = await response.json();
    console.log(json);

    // Verify status code
    expect(response.status()).toBe(200);

    // Validate the API response
    expect(json.responseCode).toBe(200);
    expect(json.message).toContain('User exists!');

});