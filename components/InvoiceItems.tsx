import { Invoice, InvoiceItem } from '../interface/invoice';
import { formatCurrency } from '../utils/manageFormData';

const InvoiceItems = ({ invoice }: { invoice: Invoice }) => {
  return (
    <>
      <div className='hidden text-gray-400 dark:text-gray-300 md:mx-8 md:mb-8 md:flex md:flex-wrap'>
        <p className='md:w-5/12 md:flex-initial md:text-xxs'>Item Name</p>
        <p className='md:w-1/12 md:flex-initial md:text-center md:text-xxs'>QTY.</p>
        <p className='md:w-3/12 md:flex-initial md:text-right md:text-xxs'>Price</p>
        <p className='md:w-3/12 md:flex-initial md:text-right md:text-xxs'>Total</p>
      </div>
      {invoice?.items.map((item: InvoiceItem, index: number) => {
        return (
          <div className='mx-6 mb-6 flex flex-wrap items-center md:mx-8' key={index}>
            <h4 className='mb-2 w-2/3 flex-initial font-bold text-blue-900 dark:text-white md:w-5/12'>
              {item?.name}
            </h4>
            <h4 className='order-last w-2/3 flex-initial font-bold text-gray-400 dark:text-gray-500 md:hidden'>
              {item?.quantity} x {formatCurrency(item?.price)}
            </h4>
            <h4 className='order-2 hidden w-2/3 flex-initial font-bold text-gray-400 dark:text-gray-500 md:block md:w-1/12 md:text-center'>
              {item?.quantity}
            </h4>
            <h4 className='order-3 hidden w-2/3 flex-initial font-bold text-gray-400 dark:text-gray-500 md:block md:w-3/12 md:text-right'>
              {formatCurrency(item?.price)}
            </h4>
            <h4 className='w-1/3 flex-initial text-right font-bold text-blue-900 dark:text-white md:order-last md:w-3/12'>
              {formatCurrency(item?.total)}
            </h4>
          </div>
        );
      })}
    </>
  );
};

export default InvoiceItems;
