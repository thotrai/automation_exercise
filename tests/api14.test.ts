import { test, expect } from '@playwright/test';

const email = 'apitesting@mail.com';

test('API 14: GET user account detail by email', async ({ request }) => {
    const response = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${email}`);
    const json = await response.json();
    console.log(json);
    
    // Verify status code
    expect(response.status()).toBe(200);

    // Basic structure validation
    expect(json).toHaveProperty('user');

    // Validate user's fields
    expect(json.user).toHaveProperty('id');
    expect(json.user).toHaveProperty('name');
    expect(json.user).toHaveProperty('email');
    expect(json.user.email).toBe(email);
    expect(json.user).toHaveProperty('title');
    expect(json.user).toHaveProperty('birth_day');
    expect(json.user).toHaveProperty('birth_month');
    expect(json.user).toHaveProperty('birth_year');
    expect(json.user).toHaveProperty('first_name');
    expect(json.user).toHaveProperty('last_name');
    expect(json.user).toHaveProperty('company');
    expect(json.user).toHaveProperty('address1');
    expect(json.user).toHaveProperty('address2');
    expect(json.user).toHaveProperty('country');
    expect(json.user).toHaveProperty('city');
    expect(json.user).toHaveProperty('zipcode');
    
});