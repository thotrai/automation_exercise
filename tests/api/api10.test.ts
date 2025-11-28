import { test, expect } from "@playwright/test";

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'invaliduser@mail.com',
            password: 'Test123@'
        }
    })
    const json = await response.json();
    console.log(json);

    // The API incorrectly returns 200
    expect(response.status()).toBe(200);

    // Validate the actual API response error
    expect(json.responseCode).toBe(404);
    expect(json.message).toContain('User not found!');

});