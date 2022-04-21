import { useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Invoice } from '../interface/invoice';
import { InvoiceContext } from '../pages/_app';
import supabaseAdmin from '../lib/supabase';

export default function DeleteModal({
  invoice,
  setShowDelete
}: {
  invoice: Invoice;
  setShowDelete: (showDelete: boolean) => void;
}) {
  const { getInvoices } = useContext(InvoiceContext);
  const router = useRouter();
  const closeModal = () => {
    setShowDelete(false);
  };
  const deleteInvoice = async () => {
    await supabaseAdmin.from('invoices').delete().match({ id: invoice.id });
    getInvoices();

    router.push('/');
  };

  const slideDown = {
    hidden: {
      y: '-100vh',
      opacity: 0
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.25,
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0
    }
  };

  return (
    <motion.div
      className='fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-[rgba(0,0,0,0.5)]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='mx-6 rounded-lg bg-white p-8 text-gray-500 dark:bg-blue-700 dark:text-gray-300 md:mx-0 md:w-[30rem] md:p-12'
        variants={slideDown}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <h2 className='mb-2 text-blue-900 dark:text-white md:mb-3'>Confirm Deletion</h2>
        <p className='tracking-sm mb-6 text-xs leading-[1.375rem]'>
          Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
        </p>
        <div className='flex justify-end'>
          <button
            className='btn-action mr-2 bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-blue-600 dark:text-white hover:dark:bg-white hover:dark:text-gray-400'
            type='button'
            aria-label='Clear'
            onClick={closeModal}
          >
            Clear
          </button>
          <button
            className='btn-action bg-red-500 text-white hover:bg-red-400'
            type='button'
            aria-label='Delete'
            onClick={deleteInvoice}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
