import { useContext } from 'react';
import Link from 'next/link';
import { InvoiceContext } from '../pages/_app';
import { Invoice } from '../interface/invoice';
import { formatDate, formatCurrency } from '../utils/formatData';
import InvoiceStatus from './InvoiceStatus';
import IconArrowRight from './IconArrowRight';

const InvoicePreview = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <>
      {invoices.data.map((invoice: Invoice) => {
        return (
          <Link key={invoice.invoice_id} href={`/invoice/${invoice.id}`}>
            <a className='mb-4 flex flex-wrap rounded-lg border-[1px] border-transparent bg-white p-6 text-blue-900 shadow-invoice transition duration-200 hover:-translate-y-1 hover:border-purple-500 dark:bg-blue-800 dark:text-white md:items-center md:justify-between md:px-8 md:py-7'>
              <p className='mb-6 w-1/2 flex-initial text-xs font-bold md:order-1 md:mb-0 md:w-auto md:flex-none'>
                <span className='text-gray-400'>#</span>
                {invoice.id}
              </p>
              <p className='mb-6 w-1/2 flex-initial text-right text-xs text-gray-500 md:order-3 md:mb-0 md:w-auto md:flex-none'>
                {invoice.clientName}
              </p>
              <p className='w-1/2 flex-initial text-xs text-gray-400 dark:text-gray-300 md:order-2 md:w-auto md:flex-none'>
                Due {formatDate(invoice.paymentDue)}
              </p>
              <h2 className='order-last -mt-4 w-1/2 flex-initial md:order-4 md:mt-0 md:w-auto md:flex-none'>
                {formatCurrency(invoice.total)}
              </h2>
              <div className='flex w-1/2 flex-initial justify-end md:order-5 md:w-auto md:flex-none'>
                <InvoiceStatus invoice={invoice} />
              </div>
              <div className='hidden md:order-6 md:block'>
                <IconArrowRight />
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default InvoicePreview;
