import { CreditCard } from "../types/CreditCard";

export const creditCards = {
  visa: {
    name: 'Test Case',
    number: '5120350100064537',
    cvc: '333',
    month: '10',
    year: '2028',
  },
} satisfies Record<string, CreditCard>;