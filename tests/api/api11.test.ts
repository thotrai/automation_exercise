import { test, expect } from "@playwright/test";

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    const timestamp = Date.now();
    const name = `User${timestamp}`;
    const email = `user${timestamp}@mail.com`;

    const response = await request.post('https://automationexercise.com/api/createAccount', {
        form: {
            name: name,
            email: email, 
            password: 'Test123@', 
            title: 'Mr', 
            birth_date: '15', 
            birth_month: '10', 
            birth_year: '1990', 
            firstname: 'Test', 
            lastname: 'User', 
            company: 'Google', 
            address1: 'Street 86', 
            address2: 'Suite 10', 
            country: 'United States', 
            zipcode: '12345', 
            state: 'California', 
            city: 'Miami', 
            mobile_number: '1234567890' 
        }
    });
    const json = await response.json();
    console.log(json);

    // Verify status code
    expect(response.status()).toBe(200);

    // Validate the actual API response 
    expect(json.responseCode).toBe(201);
    expect(json.message).toContain('User created!');

});