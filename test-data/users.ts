import { User } from '../types/User';

export const users = {
  validUser: {
    name: 'Test Case',
    email: 'testcase@mail.com',
    password: 'Password123@',
    day: '12',
    month: '12',
    year: '1990'
  },
  invalidUser: {
    name: '',
    email: 'testcase03@mail.com',
    password: 'Test123@',
    day: '',
    month: '',
    year: ''
  }
} satisfies Record<string, User>;