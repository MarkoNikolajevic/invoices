import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  senderAddress: yup.object().shape({
    street: yup.string().required("can't be empty"),
    city: yup.string().required("can't be empty"),
    postCode: yup.string().required("can't be empty"),
    country: yup.string().required("can't be empty")
  }),
  clientName: yup.string().required("can't be empty"),
  clientEmail: yup.string().email('invalid email').required("can't be empty"),
  clientAddress: yup.object().shape({
    street: yup.string().required("can't be empty"),
    city: yup.string().required("can't be empty"),
    postCode: yup.string().required("can't be empty"),
    country: yup.string().required("can't be empty")
  }),
  createdAt: yup.date().required("can't be empty"),
  paymentTerms: yup.string().required("can't be empty"),
  description: yup.string().required("can't be empty"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("can't be empty"),
        quantity: yup.number().typeError('must be a number').required("can't be empty"),
        price: yup.number().typeError('must be a number').required("can't be empty"),
        total: yup.number()
      })
    )
    .min(1, '- An item must be added')
});
