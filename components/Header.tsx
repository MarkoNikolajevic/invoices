import { motion } from 'framer-motion';
import { useContext } from 'react';
import { InvoiceContext } from '../pages/_app';
import FilterDropdown from './FilterDropdown';

const Header = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <header className='mb-8 flex'>
      <div className='mr-auto flex flex-col'>
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
      <FilterDropdown />
      <motion.button
        className='ml-[18px] flex h-12 items-center justify-between rounded-3xl bg-purple-500 px-6 pl-2 pr-4 text-xs font-bold text-white transition duration-200 hover:bg-purple-400 md:ml-10'
        type='button'
        aria-label='Add new invoice'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className='mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white'>
          <svg width='11' height='11' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
              fill='#7C5DFA'
              fillRule='nonzero'
            />
          </svg>
        </span>
        New <span className='hidden md:block'>&nbsp;Invoice</span>
      </motion.button>
    </header>
  );
};

export default Header;
