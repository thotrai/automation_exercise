import { test } from "@fixtures/apiUserFixture";
import { expect } from "@playwright/test";

// Using fixture to create a new user
test('API 13: PUT METHOD To Update User Account', async ({ request, user }) => {
    // User's details
    console.log(user);

    const response = await request.put('https://automationexercise.com/api/updateAccount?update', {
      form: {
            name: 'UserUpdated',
            email: user.email,
            password: user.password,
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
  const json = await response.json();
  console.log(json);

  // Verify status code
  expect(response.status()).toBe(200);

  // Validate the actual API response 
  expect(json.message).toContain('User updated!');

  // Updated user's details
  const response2 = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${user.email}`);
  const json2 = await response2.json();
  console.log(json2);

});