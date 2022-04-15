import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray, useWatch } from 'react-hook-form';
import { Invoice } from '../interface/invoice';
import { InvoiceContext } from '../pages/_app';
import { cn } from '../utils/classes';
import { DateInput, ErrorMessage, Input, Label } from './FormElements';

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
    setValue,
    formState: { errors, isSubmitSuccessful, isValid }
  } = useForm<Invoice>({
    mode: 'onBlur'
  });

  return (
    <form onSubmit={() => {}}>
      <h4 className='text-purple-500'>Bill From</h4>
      <div className='mt-6 mb-10 grid grid-cols-2 gap-6'>
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
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='sender-country' label='Country' error={errors.senderAddress?.country} />
            <ErrorMessage error={errors.senderAddress?.country?.type} />
          </div>
          <Input type='text' id='sender-country' error={errors.senderAddress?.country} />
        </div>
      </div>

      <h4 className='text-purple-500'>Bill To</h4>
      <div className='mt-6 mb-16 grid grid-cols-2 gap-6'>
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
        <div className='col-span-full flex flex-col'>
          <div className='flex justify-between'>
            <Label htmlFor='client-country' label='Country' error={errors.clientAddress?.country} />
            <ErrorMessage error={errors.clientAddress?.country?.type} />
          </div>
          <Input type='text' id='client-country' error={errors.clientAddress?.country} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='col-span-full flex flex-col'>
          <Label htmlFor='created-at' label='Invoice Date' />
          <DateInput id='created-at' />
        </div>
        <div className='col-span-full flex flex-col'></div>
        <div className='col-span-full flex flex-col'>
          <Label htmlFor='description' label='Project / Description' />
          <Input type='text' id='description' error={errors.description} />
        </div>
      </div>
    </form>
  );
};

export default AddInvoiceForm;
