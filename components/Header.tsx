import { useContext } from 'react';
import { InvoiceContext } from '../pages/_app';
import FilterDropdown from './FilterDropdown';

const Header = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <header className='mb-8 flex justify-between'>
      <div className='flex flex-col'>
        <h1 className='mb-1 text-blue-900 dark:text-white md:mb-2'>Invoices</h1>
        <p className='text-xs text-gray-500 dark:text-gray-300'>
          {invoices?.data.length > 0 && (
            <>
              <span className='md:hidden'>
                {invoices?.data.length} {invoices?.data.length === 1 ? 'invoice' : 'invoices'}
              </span>
              <span className='hidden md:block'>
                There are {invoices?.data.length} total invoices
              </span>
            </>
          )}
          {invoices?.data.length === 0 && <span>No invoices</span>}
        </p>
      </div>
      <div>
        <FilterDropdown />
      </div>
    </header>
  );
};

export default Header;
