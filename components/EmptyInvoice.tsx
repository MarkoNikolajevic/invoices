import Image from 'next/image';

const EmptyInvoice = () => {
  return (
    <div className='mx-auto mt-24 text-center lg:mt-20'>
      <Image
        src='/illustration-empty.svg'
        width={240}
        height={200}
        alt='no invoices illustration'
      />
      <h2 className='mt-10 mb-6 text-xl font-bold text-blue-900 dark:text-white md:mt-16'>
        There is nothing here
      </h2>
      <p className='text-xs text-gray-500 dark:text-gray-300'>
        Create an invoice by clicking the
        <br />
        <span className='font-bold'>New</span> button and get started
      </p>
    </div>
  );
};

export default EmptyInvoice;
