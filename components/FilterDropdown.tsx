import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FilterOptions from './FilterOptions';
import { cn } from '../utils/classes';

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [check, setCheck] = useState([
    {
      id: 0,
      value: 'paid',
      checked: false
    },
    {
      id: 1,
      value: 'pending',
      checked: false
    },
    {
      id: 2,
      value: 'draft',
      checked: false
    }
  ]);

  const handleCheckbox = (id: number) => {
    setCheck(
      check.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return { ...item, checked: false };
      })
    );
  };

  return (
    <div className='relative inline-flex flex-col items-center justify-center'>
      <div className='w-full'>
        <button
          type='button'
          aria-expanded='true'
          aria-haspopup='true'
          className='flex w-full items-center text-xs font-bold text-blue-900 dark:text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter&nbsp;<span className='hidden md:block'> by status</span>
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
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className='absolute top-12 z-10 flex w-48 flex-col rounded-lg bg-white p-6 shadow-dropdown-light dark:bg-blue-600 dark:shadow-dropdown-dark'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.2 }}
          >
            {check.map((item) => (
              <FilterOptions
                key={item.id}
                checked={item.checked}
                value={item.value}
                id={item.id}
                handleCheckbox={handleCheckbox}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
