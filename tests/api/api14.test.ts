import { test } from '@fixtures/apiUserFixture';
import { expect } from '@playwright/test';

// Using fixture to create a new user
test('API 14: GET user account detail by email', async ({ request, user }) => {
    
    const response = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${user.email}`);
    const json = await response.json();
    console.log(json);
    
    // Verify status code
    expect(response.status()).toBe(200);

    // Basic structure validation
    expect(json).toHaveProperty('user');

    // Validate user's fields
    expect(json.user).toHaveProperty('id');
    expect(json.user.id).toBeTruthy();

    expect(json.user).toHaveProperty('name');
    expect(json.user.name).toBe(user.name);

    expect(json.user).toHaveProperty('email');
    expect(json.user.email).toBe(user.email);

    expect(json.user).toHaveProperty('title');
    expect(json.user.title).toBe(user.title);

    expect(json.user).toHaveProperty('birth_day');
    // API BUG: birth_day is being stored as birth_date at the server
    expect(json.user.birth_day).toBe(user.birth_date);

    expect(json.user).toHaveProperty('birth_month');
    expect(json.user.birth_month).toBe(user.birth_month);

    expect(json.user).toHaveProperty('birth_year');
    expect(json.user.birth_year).toBe(user.birth_year);

    expect(json.user).toHaveProperty('first_name');
    expect(json.user.first_name).toBe(user.firstname);

    expect(json.user).toHaveProperty('last_name');
    expect(json.user.last_name).toBe(user.lastname);

    expect(json.user).toHaveProperty('company');
    expect(json.user.company).toBe(user.company);

    expect(json.user).toHaveProperty('address1');
    expect(json.user.address1).toBe(user.address1);

    expect(json.user).toHaveProperty('address2');
    expect(json.user.address2).toBe(user.address2);

    expect(json.user).toHaveProperty('country');
    expect(json.user.country).toBe(user.country);

    expect(json.user).toHaveProperty('city');
    expect(json.user.city).toBe(user.city);

    expect(json.user).toHaveProperty('zipcode');
    expect(json.user.zipcode).toBe(user.zipcode);
    
});