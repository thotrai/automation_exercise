import { User } from '../types/User';

export function generateRandomUser(): User {
    const timestamp = Date.now();
    return {
      name: `User${timestamp}`,
      email: `user${timestamp}@mail.com`,
      password: 'Test123@'
    }
}

export function generateStrongPassword(length: number=12): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';
    const allChars = upper + lower + numbers + symbols;

    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}

export function createRandomUser(): User {
  const timestamp = Date.now();
  return {
    name: `User${timestamp}`,
    email: `user${timestamp}@mail.com`,
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
  };
}