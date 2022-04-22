import { useContext } from 'react';
import { motion } from 'framer-motion';
import { InvoiceContext } from '../pages/_app';
import { Invoice } from '../interface/invoice';
import supabaseClient from '../lib/supabase';

const InvoiceAction = ({
  invoice,
  setShowDelete,
  setShowEdit
}: {
  invoice: Invoice;
  setShowDelete: (showDelete: boolean) => void;
  setShowEdit: (showEdit: boolean) => void;
}) => {
  const { getInvoices } = useContext(InvoiceContext);

  const editInvoice = () => {
    setShowEdit(true);
    window.scrollTo(0, 0);
  };

  const showDeleteModal = () => {
    setShowDelete(true);
    window.scrollTo(0, 0);
  };

  const markAsPaid = async () => {
    if (invoice?.status === 'paid') return;

    invoice.status = 'paid';
    await supabaseClient.from('invoices').update({ status: 'paid' }).match({ id: invoice.id });

    getInvoices();
  };

  return (
    <>
      <motion.button
        className='btn-action mr-2 bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-blue-600 dark:text-white hover:dark:bg-white hover:dark:text-gray-400'
        type='button'
        aria-label='Edit'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={editInvoice}
      >
        Edit
      </motion.button>
      <motion.button
        className='btn-action mr-2 bg-red-500 text-white hover:bg-red-400'
        type='button'
        aria-label='Delete'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={showDeleteModal}
      >
        Delete
      </motion.button>
      {invoice?.status !== 'paid' && (
        <motion.button
          className='btn-action bg-purple-500 text-white hover:bg-purple-400'
          type='button'
          aria-label='Mark as paid'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => markAsPaid()}
        >
          Mark as Paid
        </motion.button>
      )}
    </>
  );
};

export default InvoiceAction;
