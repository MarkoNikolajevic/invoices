import dayjs from 'dayjs';
import { InvoiceItem } from '../interface/invoice';

export const formatDate = (date: string): string => {
  return dayjs(date).format('D MMM YYYY');
};

export const formatCurrency = (value: number): string => {
  return value?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export const createId = (lettersLength: number, numbersLength: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';

  for (let i = 0; i < lettersLength; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < numbersLength; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return id;
};

export const calculateTotalPrice = (items: InvoiceItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
