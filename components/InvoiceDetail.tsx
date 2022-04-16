import { Invoice } from '../interface/invoice';
import { formatCurrency, formatDate } from '../utils/manageFormData';
import GoBackButton from './GoBackButton';
import InvoiceAction from './InvoiceAction';
import InvoiceItems from './InvoiceItems';
import InvoiceStatus from './InvoiceStatus';

const InvoiceDetail = ({ invoice }: { invoice: Invoice }) => {
  return (
    <main className='relative w-full'>
      <div className='mx-6 mt-8 flex flex-col md:mx-12 md:mt-14 lg:mx-auto lg:mt-18 lg:w-4/5'>
        <GoBackButton />
        <div className='mt-8 rounded-lg bg-white px-8 py-6 shadow-invoice dark:bg-blue-800 md:flex md:items-center md:justify-between md:py-8'>
          <div className='flex items-center justify-between'>
            <p className='text-gray text-xs font-medium dark:text-gray-300 md:mr-4'>Status</p>
            <InvoiceStatus invoice={invoice} />
          </div>
          <div className='hidden md:flex'>
            <InvoiceAction />
          </div>
        </div>
        <div className='mt-8 mb-14 rounded-lg bg-white px-8 py-6 shadow-invoice dark:bg-blue-800 md:py-8'>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex flex-col'>
              <h3 className='text-xs font-bold text-blue-900 dark:text-white'>
                <span className='text-gray-400'>#</span>
                {invoice.id}
              </h3>
              <p className='mt-1 text-xs text-gray-400 dark:text-gray-300'>{invoice.description}</p>
            </div>
            <div className='mt-8 flex flex-col md:mt-0 md:text-right'>
              <p className='text-xxs text-gray-400 dark:text-gray-300'>
                {invoice.senderAddress.street}
                <br />
                {invoice.senderAddress.city}
                <br />
                {invoice.senderAddress.postCode}
                <br />
                {invoice.senderAddress.country}
              </p>
            </div>
          </div>
          <div className='mt-8 flex flex-wrap'>
            <div className='w-1/2 flex-initial md:w-1/3'>
              <div>
                <h4 className='text-gray-400 dark:text-gray-300'>Invoice Date</h4>
                <h3 className='mt-3 text-blue-900 dark:text-white'>
                  {formatDate(invoice.createdAt)}
                </h3>
              </div>
              <div className='mt-8'>
                <h4 className='text-gray-400 dark:text-gray-300'>Payment Due</h4>
                <h3 className='mt-3 text-blue-900 dark:text-white'>
                  {formatDate(invoice.paymentDue)}
                </h3>
              </div>
            </div>
            <div className='w-1/2 flex-initial md:w-1/3'>
              <h4 className='text-gray-400 dark:text-gray-300'>Bill to</h4>
              <h3 className='mt-3 text-blue-900 dark:text-white'>{invoice.clientName}</h3>
              <p className='mt-2 text-xxs text-gray-400 dark:text-gray-300'>
                {invoice.clientAddress.street}
                <br />
                {invoice.clientAddress.city}
                <br />
                {invoice.clientAddress.postCode}
                <br />
                {invoice.clientAddress.country}
              </p>
            </div>
            <div className='mt-8 w-full flex-initial md:mt-0 md:w-1/3'>
              <h4 className='text-gray-400 dark:text-gray-300'>Sent to</h4>
              <h3 className='mt-3 text-blue-900 dark:text-white'>{invoice.clientEmail}</h3>
            </div>
          </div>
          <div className='mt-10 rounded-lg bg-gray-100 pt-6 dark:bg-blue-600 md:pt-8'>
            <InvoiceItems invoice={invoice} />
            <div className='mt-6 flex items-center justify-between rounded-b-lg bg-blue-900 p-6 text-white md:mt-8 md:p-8'>
              <p className='text-xxs'>Amount Due</p>
              <p className='text-2xl font-bold'>{formatCurrency(invoice.total)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 right-0 left-0 flex justify-between bg-white p-6 dark:bg-blue-800 md:hidden'>
        <InvoiceAction />
      </div>
    </main>
  );
};

export default InvoiceDetail;
