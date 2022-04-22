import { motion } from 'framer-motion';

const FilterOptions = ({ ...props }) => {
  return (
    <label
      className='group mb-4 inline-flex items-center last-of-type:mb-0 hover:cursor-pointer'
      onClick={() => props.handleCheckbox(props.id)}
    >
      <input
        type='checkbox'
        checked={props.checked}
        value={props.value}
        className='rounded-sm border-0 bg-gray-300 text-purple-500 transition checked:bg-purple-500 focus:ring-transparent focus:ring-offset-transparent group-hover:cursor-pointer group-hover:border-[1px] group-hover:border-purple-500 dark:bg-blue-800 checked:dark:bg-purple-500'
      />
      <span className='ml-3 text-xs font-bold capitalize text-blue-800 dark:text-white'>
        {props.value}
      </span>
    </label>
  );
};

export default FilterOptions;
