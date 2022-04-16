import { Invoice } from '../interface/invoice';

export const defaultFormValues: Invoice = {
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',
  status: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  items: [],
  total: 0
};
