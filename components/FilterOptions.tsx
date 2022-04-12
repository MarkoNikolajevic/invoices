import { motion } from 'framer-motion';

const FilterOptions = () => {
  return (
    <motion.div
      className='flex w-48 flex-col rounded-lg bg-white p-6 dark:bg-blue-600'
      initial='collapsed'
      animate='open'
      exit='collapsed'
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 }
      }}
      transition={{ duration: 0.2 }}
    >
      <label className='group mb-4 inline-flex items-center hover:cursor-pointer'>
        <input
          type='checkbox'
          className='rounded-sm border-0 bg-gray-300 text-purple-500 transition checked:bg-purple-500 focus:ring-transparent group-hover:cursor-pointer group-hover:border-[1px] group-hover:border-purple-500 dark:bg-blue-800 checked:dark:bg-purple-500'
        />
        <span className='ml-3 text-xs font-bold text-blue-800 dark:text-white'>Draft</span>
      </label>
      <label className='group mb-4 inline-flex items-center hover:cursor-pointer'>
        <input
          type='checkbox'
          className='rounded-sm border-0 bg-gray-300 text-purple-500 transition checked:bg-purple-500 focus:ring-transparent group-hover:cursor-pointer group-hover:border-[1px] group-hover:border-purple-500 dark:bg-blue-800 checked:dark:bg-purple-500'
        />
        <span className='ml-3 text-xs font-bold text-blue-800 dark:text-white'>Pending</span>
      </label>
      <label className='group inline-flex items-center hover:cursor-pointer'>
        <input
          type='checkbox'
          className='rounded-sm border-0 bg-gray-300 text-purple-500 transition checked:bg-purple-500 focus:ring-transparent group-hover:cursor-pointer group-hover:border-[1px] group-hover:border-purple-500 dark:bg-blue-800 checked:dark:bg-purple-500'
        />
        <span className='ml-3 text-xs font-bold text-blue-800 dark:text-white'>Paid</span>
      </label>
    </motion.div>
  );
};

export default FilterOptions;
