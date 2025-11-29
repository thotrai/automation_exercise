import { test as base } from '@playwright/test';
import { User } from '../types/User';
import { createRandomUser } from '@utils/helperFunctions';

type Fixtures = {
    user: User;
}

export const test = base.extend<Fixtures> ({
    user: async ({ request }, use) => {
        const user = createRandomUser();

        const response = await request.post('https://automationexercise.com/api/createAccount', {
            form: user
        });
    
        if (response.status() !== 201) {
            throw new Error(`Failed to create user: ${await response.text()}`);
        }

        await use(user);

        await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: user.email,
                password: user.password
            }
        });
    }
});