import { Address } from '../types/Address';

export const addresses = {
  address1: {
    firstName: 'Test',
    lastName: 'Case',
    company: 'SAP',
    address1: 'Random Street 86',
    address2: 'Suite 10',
    city: 'Florida',
    state: 'Miami',
    zipcode: '12345',
    country: 'United States',
    mobileNumber: '1234567890',
  },
} satisfies Record<string, Address>;