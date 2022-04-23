import { forwardRef, LegacyRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '../utils/classes';
import IconCalendar from './IconCalendar';

export const Label = ({ ...props }) => {
  return (
    <label
      className={cn(
        'mb-[10px] text-xs font-medium',
        props.error ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
      )}
      htmlFor={props.htmlFor}
    >
      {props.label}
    </label>
  );
};

export const ErrorMessage = ({ ...props }) => {
  return <small className='text-xxs font-semibold text-red-500'>{props.error}</small>;
};

export const Input = ({ ...props }) => {
  return (
    <input
      type={props.type}
      id={props.id}
      className={cn(
        'h-12 rounded border bg-white py-4 px-5 text-xs font-bold caret-purple-500 outline-none transition-all dark:bg-blue-800 dark:text-white dark:outline-none',
        props.error
          ? 'border-red-500'
          : 'border-gray-300 text-blue-900 focus:border-purple-500 dark:border-blue-600 focus:dark:border-purple-500'
      )}
    />
  );
};

export const DateInput = ({ ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  const CustomInput = forwardRef(
    ({ value, onClick }: { value?: any; onClick?: any }, ref: LegacyRef<HTMLDivElement>) => (
      <div
        onClick={onClick}
        ref={ref}
        className={cn(
          'date-picker flex w-full justify-between',
          props.readOnly ? 'read-only:opacity-50' : ''
        )}
      >
        {value}
        <IconCalendar />
      </div>
    )
  );

  CustomInput.displayName = 'CustomInput';

  return (
    <>
      <ReactDatePicker
        id={props.id}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat='d MMM yyyy'
        customInput={<CustomInput />}
        calendarClassName='bg-white dark:bg-blue-600 !border-none font-serif p-6'
        readOnly={props.readOnly}
      />
    </>
  );
};
