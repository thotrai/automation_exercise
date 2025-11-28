import { test, expect } from "@playwright/test";

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@mail.com`;

    const response = await request.post('https://automationexercise.com/api/createAccount', {
        form: {
            name: 'TestUser',
            email: email, 
            password: 'Test123@', 
            title: 'Mr', 
            birth_date: '10', 
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
            mobile_number: '123456789' 
        }
    });
    const json = await response.json();
    console.log(json);

    // Verify status code
    expect(response.status()).toBe(200);

    // Validate the actual API response 
    expect(json.responseCode).toBe(201);
    expect(json.message).toContain('User created!');

    const password = 'Test123@';

    const response2 = await request.put('https://automationexercise.com/api/updateAccount', {
      form: {
            name: 'TestUserEdited',
            email,
            password,
            title: 'Mr', 
            birth_date: '20', 
            birth_month: '12', 
            birth_year: '2000', 
            firstname: 'Test', 
            lastname: 'UserEdited', 
            company: 'Amazon', 
            address1: 'Street 99', 
            address2: 'Suite 20', 
            country: 'Canada', 
            zipcode: '54321', 
            state: 'Ontario', 
            city: 'Toronto', 
            mobile_number: '987654321' 
      }
    }
  );
  const body = await response2.json();
  console.log(body);

  // Verify status code
  expect(response2.status()).toBe(200);

  // Validate the actual API response 
  expect(body.message).toContain('User updated!');

});