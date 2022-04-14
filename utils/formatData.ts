import dayjs from 'dayjs';

export const formatDate = (date: string): string => {
  return dayjs(date).format('D MMM YYYY');
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};
