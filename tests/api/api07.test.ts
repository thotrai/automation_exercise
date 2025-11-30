import { test } from "@fixtures/apiUserFixture";
import { expect } from '@playwright/test';

// Using fixture to create a new user
test('API 7: POST To Verify Login with valid details', async ({ request, user }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: user.email,
            password: user.password
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