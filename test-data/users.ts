import { User } from '../types/User';
import { generateRandomUser } from '@utils/helperFunctions';

const randomUser = generateRandomUser();

export const users = {
  validUser: {
    name: randomUser.name,
    email: randomUser.email,
    password: 'Test123@',
    birth_date: '12',
    birth_month: '12',
    birth_year: '1990'
  },
  invalidUser: {
    name: '',
    email: 'invalidUser@mail.com',
    password: 'Test123@',
    birth_date: '',
    birth_month: '',
    birth_year: ''
  }
} satisfies Record<string, User>;