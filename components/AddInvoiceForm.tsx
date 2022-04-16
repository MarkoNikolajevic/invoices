import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Invoice } from '../interface/invoice';
import supabaseClient from '../lib/supabase';
import { InvoiceContext } from '../pages/_app';
import { cn } from '../utils/classes';
import { defaultFormValues } from '../utils/defaultFormValues';
import { calculateTotalPrice, createId } from '../utils/manageFormData';
import { DateInput, ErrorMessage, Input, Label } from './FormElements';
import IconDelete from './IconDelete';

const AddInvoiceForm = ({
  setShowAddInvoice
}: {
  setShowAddInvoice: (showAddInvoice: boolean) => void;
}) => {
  const { getInvoice } = useContext(InvoiceContext);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, isValid }
  } = useForm<Invoice>({
    mode: 'onBlur'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const createNewInvoice: SubmitHandler<Invoice> = async ({ ...data }) => {
    data = {
      ...data,
      id: createId(2, 4),
      paymentDue: dayjs().add(data.paymentTerms, 'day').format('D MMM YYYY'),
      status: 'pending',
      total: calculateTotalPrice(data.items)
    };
    await supabaseClient.from('invoices').insert(data);
    getInvoice();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultFormValues);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(createNewInvoice)}>
      <h4 className='text-purple-500'>Bill From</h4>
      <div className='mt-6 mb-10 grid grid-cols-2 gap-6 md:grid-cols-3'>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='sender-street'
              label='Street Address'
              error={errors.senderAddress?.street}
            />
            <ErrorMessage error={errors.senderAddress?.street?.type} />
          </div>
          <Input type='text' id='sender-street' error={errors.senderAddress?.street} />
        </div>
        <div className='col-start-1 col-end-2 flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='sender-city' label='City' error={errors.senderAddress?.city} />
            <ErrorMessage error={errors.senderAddress?.city?.type} />
          </div>
          <Input type='text' id='sender-city' error={errors.senderAddress?.city} />
        </div>
        <div className='col-start-2 col-end-3 flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='sender-postCode'
              label='Post Code'
              error={errors.senderAddress?.postCode}
            />
            <ErrorMessage error={errors.senderAddress?.postCode?.type} />
          </div>
          <Input type='text' id='sender-postCode' error={errors.senderAddress?.postCode} />
        </div>
        <div className='col-span-full flex flex-col md:col-start-3 md:col-end-4'>
          <div className='flex justify-between'>
            <Label htmlFor='sender-country' label='Country' error={errors.senderAddress?.country} />
            <ErrorMessage error={errors.senderAddress?.country?.type} />
          </div>
          <Input type='text' id='sender-country' error={errors.senderAddress?.country} />
        </div>
      </div>

      <h4 className='text-purple-500'>Bill To</h4>
      <div className='mt-6 mb-16 grid grid-cols-2 gap-6 md:grid-cols-3'>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-name' label="Client's Name" error={errors.clientName} />
            <ErrorMessage error={errors.clientName?.type} />
          </div>
          <Input type='text' id='client-name' error={errors.clientName} />
        </div>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-email' label="Client's Email" error={errors.clientEmail} />
            <ErrorMessage error={errors.clientEmail?.type} />
          </div>
          <Input type='text' id='client-email' error={errors.clientEmail} />
        </div>
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='client-street'
              label='Street Address'
              error={errors.clientAddress?.street}
            />
            <ErrorMessage error={errors.clientAddress?.street?.type} />
          </div>
          <Input type='text' id='client-street' error={errors.clientAddress?.street} />
        </div>
        <div className='col-start-1 col-end-2 flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-city' label='City' error={errors.clientAddress?.city} />
            <ErrorMessage error={errors.clientAddress?.city?.type} />
          </div>
          <Input type='text' id='client-city' error={errors.clientAddress?.city} />
        </div>
        <div className='col-start-2 col-end-3 flex flex-col'>
          <div className='flex justify-between'>
            <Label
              htmlFor='client-postCode'
              label='Post Code'
              error={errors.clientAddress?.postCode}
            />
            <ErrorMessage error={errors.clientAddress?.postCode?.type} />
          </div>
          <Input type='text' id='client-postCode' error={errors.clientAddress?.postCode} />
        </div>
        <div className='col-span-full flex flex-col md:col-start-3 md:col-end-4'>
          <div className='flex justify-between'>
            <Label htmlFor='client-country' label='Country' error={errors.clientAddress?.country} />
            <ErrorMessage error={errors.clientAddress?.country?.type} />
          </div>
          <Input type='text' id='client-country' error={errors.clientAddress?.country} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='col-span-full flex flex-col md:col-start-1 md:col-end-2'>
          <Label htmlFor='created-at' label='Invoice Date' />
          <DateInput id='created-at' />
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
          <Label htmlFor='description' label='Project / Description' />
          <Input type='text' id='description' error={errors.description} />
        </div>
      </div>
      <h2 className='mb-6 mt-16 text-gray-400 dark:text-gray-500'>Item List</h2>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className='mb-12 grid grid-cols-11 gap-6 md:grid-cols-12'>
            <div className='col-span-full flex flex-col md:col-span-4'>
              <Label label='Item name' htmlFor='item-name' />
              <Input type='text' id={`items.${index}.name`} error={errors.items?.[index].name} />
            </div>
            <div className='col-span-3 flex flex-col md:col-span-2'>
              <Label label='Qty.' htmlFor='item-quantity' />
              <Input
                type='text'
                id={`items.${index}.quantity`}
                error={errors.items?.[index].quantity}
              />
            </div>
            <div className='col-span-4 flex flex-col md:col-span-3'>
              <Label label='Price' htmlFor='item-price' />
              <Input type='text' id={`items.${index}.price`} error={errors.items?.[index].price} />
            </div>
            <div className='relative col-span-4 flex flex-col md:col-span-3'>
              <Label label='Total' htmlFor='item-total' />
              <input
                type='text'
                id={`items.${index}.total`}
                readOnly
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
    </form>
  );
};

export default AddInvoiceForm;
