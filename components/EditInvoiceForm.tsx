import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Invoice } from '../interface/invoice';
import supabaseClient from '../lib/supabase';
import { InvoiceContext } from '../pages/_app';
import { cn } from '../utils/classes';
import { calculateTotalPrice } from '../utils/manageFormData';
import { DateInput, ErrorMessage, Label } from './FormElements';
import IconDelete from './IconDelete';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../utils/schemaValidation';

const EditInvoiceForm = ({
  setShowEdit,
  invoice
}: {
  setShowEdit: (showEdit: boolean) => void;
  invoice: Invoice;
}) => {
  const { getInvoices } = useContext(InvoiceContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful }
  } = useForm<Invoice>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: invoice
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const updateInvoice: SubmitHandler<Invoice> = async (data) => {
    data = {
      ...data,
      createdAt: dayjs(data.createdAt).format('YYYY-MM-DD'),
      paymentDue: dayjs(data.createdAt).add(data.paymentTerms, 'day').format('YYYY-MM-DD'),
      status: data.status === 'draft' ? 'pending' : data.status,
      total: calculateTotalPrice(data.items)
    };
    await supabaseClient.from('invoices').update(data).match({ id: invoice.id });
    getInvoices();
    router.push('/');
    setShowEdit(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(invoice);
    }
  }, [isSubmitSuccessful, reset, invoice]);

  return (
    <form onSubmit={handleSubmit(updateInvoice)} className='mx-6'>
      <h4 className='text-purple-500'>Bill From</h4>
      <div className='mt-6 mb-10 grid grid-cols-2 gap-6 md:grid-cols-3'>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='sender-street'
              label='Street Address'
              error={errors.senderAddress?.street}
            />
            <ErrorMessage error={errors.senderAddress?.street?.message} />
          </div>
          <input
            type='text'
            id='sender-street'
            {...register('senderAddress.street')}
            className={cn(
              'input',
              errors.senderAddress?.street
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-start-1 col-end-2 flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='sender-city' label='City' error={errors.senderAddress?.city} />
            <ErrorMessage error={errors.senderAddress?.city?.message} />
          </div>
          <input
            type='text'
            id='sender-city'
            {...register('senderAddress.city')}
            className={cn(
              'input',
              errors.senderAddress?.city
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-start-2 col-end-3 flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='sender-postCode'
              label='Post Code'
              error={errors.senderAddress?.postCode}
            />
            <ErrorMessage error={errors.senderAddress?.postCode?.message} />
          </div>
          <input
            type='text'
            id='sender-postCode'
            {...register('senderAddress.postCode')}
            className={cn(
              'input',
              errors.senderAddress?.postCode
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-span-full flex flex-col md:col-start-3 md:col-end-4'>
          <div className='flex justify-between'>
            <Label htmlFor='sender-country' label='Country' error={errors.senderAddress?.country} />
            <ErrorMessage error={errors.senderAddress?.country?.message} />
          </div>
          <input
            type='text'
            id='sender-country'
            {...register('senderAddress.country')}
            className={cn(
              'input',
              errors.senderAddress?.country
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
      </div>

      <h4 className='text-purple-500'>Bill To</h4>
      <div className='mt-6 mb-16 grid grid-cols-2 gap-6 md:grid-cols-3'>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-name' label="Client's Name" error={errors.clientName} />
            <ErrorMessage error={errors.clientName?.message} />
          </div>
          <input
            type='text'
            id='client-name'
            {...register('clientName')}
            className={cn(
              'input',
              errors.clientName
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-email' label="Client's Email" error={errors.clientEmail} />
            <ErrorMessage error={errors.clientEmail?.message} />
          </div>
          <input
            type='text'
            id='client-email'
            placeholder='e.g. email@example.com'
            {...register('clientEmail')}
            className={cn(
              'input',
              errors.clientEmail
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='client-street'
              label='Street Address'
              error={errors.clientAddress?.street}
            />
            <ErrorMessage error={errors.clientAddress?.street?.message} />
          </div>
          <input
            type='text'
            id='client-street'
            {...register('clientAddress.street')}
            className={cn(
              'input',
              errors.clientAddress?.street
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-start-1 col-end-2 flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-city' label='City' error={errors.clientAddress?.city} />
            <ErrorMessage error={errors.clientAddress?.city?.message} />
          </div>
          <input
            type='text'
            id='client-city'
            {...register('clientAddress.city')}
            className={cn(
              'input',
              errors.clientAddress?.city
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-start-2 col-end-3 flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='client-postCode'
              label='Post Code'
              error={errors.clientAddress?.postCode}
            />
            <ErrorMessage error={errors.clientAddress?.postCode?.message} />
          </div>
          <input
            type='text'
            id='client-postCode'
            {...register('clientAddress.postCode')}
            className={cn(
              'input',
              errors.clientAddress?.postCode
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
        <div className='col-span-full flex flex-col md:col-start-3 md:col-end-4'>
          <div className='flex justify-between'>
            <Label htmlFor='client-country' label='Country' error={errors.clientAddress?.country} />
            <ErrorMessage error={errors.clientAddress?.country?.message} />
          </div>
          <input
            type='text'
            id='client-country'
            {...register('clientAddress.country')}
            className={cn(
              'input',
              errors.clientAddress?.country
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='col-span-full flex flex-col md:col-start-1 md:col-end-2'>
          <Label htmlFor='created-at' label='Invoice Date' />
          <DateInput id='created-at' readOnly={true} />
        </div>
        <div className='col-span-full flex flex-col md:col-start-2 md:col-end-3'>
          <Label htmlFor='payment-terms' label='Payment Terms' />
          <select
            id='payment-terms'
            {...register('paymentTerms')}
            className={cn(
              'h-12 rounded border bg-white py-4 px-5 text-xs font-bold caret-purple-500 outline-none transition-all dark:bg-blue-800 dark:text-white dark:outline-none',
              errors.paymentTerms
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          >
            <option value='1'>Net 1 Day</option>
            <option value='7'>Net 7 Days</option>
            <option value='14'>Net 14 Days</option>
            <option value='30'>Net 30 Days</option>
          </select>
        </div>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='description' label='Project / Description' error={errors.description} />
            <ErrorMessage error={errors.description?.message} />
          </div>
          <input
            type='text'
            id='description'
            placeholder='e.g. Graphic Design Service'
            {...register('description')}
            className={cn(
              'input',
              errors.description
                ? 'border-red-500'
                : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
            )}
          />
        </div>
      </div>
      <h2 className='mb-6 mt-16 text-gray-400 dark:text-gray-500'>Item List</h2>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className='mb-12 grid grid-cols-11 gap-6 md:grid-cols-12'>
            <div className='col-span-full flex flex-col md:col-span-4'>
              <Label label='Item name' htmlFor='item-name' />
              <input
                type='text'
                id={`items.${index}.name`}
                {...register(`items.${index}.name`)}
                className={cn(
                  'input',
                  errors.items?.[index]?.name
                    ? 'border-red-500'
                    : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
                )}
              />
            </div>
            <div className='col-span-3 flex flex-col md:col-span-2'>
              <Label label='Qty.' htmlFor='item-quantity' />
              <input
                type='text'
                id={`items.${index}.quantity`}
                defaultValue={`${field.quantity}`}
                {...register(`items.${index}.quantity`, {
                  required: true,
                  pattern: /^[0-9]+$/i,
                  onBlur: () =>
                    setValue(
                      `items.${index}.total`,
                      watch(`items.${index}.quantity`) * watch(`items.${index}.price`)
                    )
                })}
                className={cn(
                  'input',
                  errors.items?.[index]?.quantity
                    ? 'border-red-500'
                    : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
                )}
              />
            </div>
            <div className='col-span-4 flex flex-col md:col-span-3'>
              <Label label='Price' htmlFor='item-price' />
              <input
                type='text'
                id={`items.${index}.price`}
                defaultValue={`${field.price}`}
                {...register(`items.${index}.price`, {
                  required: true,
                  pattern: /^[0-9]+$/i,
                  onBlur: () =>
                    setValue(
                      `items.${index}.total`,
                      watch(`items.${index}.quantity`) * watch(`items.${index}.price`)
                    )
                })}
                className={cn(
                  'input',
                  errors.items?.[index]?.price
                    ? 'border-red-500'
                    : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
                )}
              />
            </div>
            <div className='relative col-span-4 flex flex-col md:col-span-3'>
              <Label label='Total' htmlFor='item-total' />
              <input
                type='text'
                {...register(`items.${index}.total`, { value: field.total })}
                id={`items.${index}.total`}
                defaultValue={watch(`items.${index}.quantity`) * watch(`items.${index}.price`)}
                disabled
                className='h-12 rounded border-0 bg-transparent py-4 px-5 text-xs font-bold outline-none transition-all dark:text-white dark:outline-none'
              />
              <div className='absolute top-1/2 right-0 flex -translate-y-1/2 items-center justify-end bg-none pt-4'>
                <button onClick={() => remove(index)} type='button' aria-label='Delete item'>
                  <IconDelete />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button
        type='button'
        className='btn-action flex w-full items-center justify-center bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-blue-600 dark:text-gray-500 hover:dark:bg-blue-800 hover:dark:text-gray-300'
        arial-label='Add New Item'
        onClick={() => {
          append({ name: '', quantity: 0, price: 0, total: 0 });
        }}
      >
        + Add New Item
      </button>
      <div className='sticky bottom-0 -mx-6 flex justify-end bg-white p-6 dark:bg-blue-700'>
        <button
          className='btn-action mr-2 bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-blue-600 dark:text-white hover:dark:bg-white hover:dark:text-gray-400'
          type='button'
          aria-label='Cancel'
          onClick={() => setShowEdit(false)}
        >
          Cancel
        </button>
        <button
          className='btn-action bg-purple-500 text-white hover:bg-purple-400'
          type='submit'
          aria-label='Save Changes'
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditInvoiceForm;
