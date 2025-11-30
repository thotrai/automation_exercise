import { test } from "@fixtures/apiUserFixture";
import { expect } from "@playwright/test";

// Using fixture to create a new user
test('API 12: DELETE METHOD To Delete User Account', async ({ request, user }) => {
    const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password
      }
    }
  );
  const json = await response.json();
  console.log(json);

  // Verify status code
  expect(response.status()).toBe(200);

  // Validate the actual API response 
  expect(json.message).toContain('Account deleted!');

});