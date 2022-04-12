import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterOptions from './FilterOptions';

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className='relative inline-flex w-48 flex-col'>
      <div className='mb-6 w-full'>
        <button
          type='button'
          aria-expanded='true'
          aria-haspopup='true'
          className='flex w-full items-center justify-center text-xs font-bold text-blue-900 dark:text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter <span className='hidden md:block'> by status</span>
          <svg
            width='11'
            height='7'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('ml-4 transition duration-200', isOpen ? 'rotate-180' : '')}
          >
            <path
              d='M1 1l4.228 4.228L9.456 1'
              stroke='#7C5DFA'
              strokeWidth='2'
              fill='none'
              fillRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <AnimatePresence initial={false}>{isOpen && <FilterOptions />}</AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
