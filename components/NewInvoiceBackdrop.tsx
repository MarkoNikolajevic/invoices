import { motion } from 'framer-motion';
import AddInvoiceForm from './AddInvoiceForm';
import GoBackButton from './GoBackButton';
import IconArrowLeft from './IconArrowLeft';

const NewInvoiceBackdrop = ({
  setShowAddInvoice
}: {
  setShowAddInvoice: (setShowAddInvoice: boolean) => void;
}) => {
  const slideIn = {
    hidden: {
      x: '-100vw',
      opacity: 0
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.25,
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      x: '-100vh',
      opacity: 0
    }
  };
  return (
    <motion.div
      className='absolute top-0 left-0 h-full w-full bg-[#000000e1]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAddInvoice(false)}
    >
      <motion.div
        className='h-screen w-full overflow-scroll rounded-r-[1.25rem] bg-white py-8 px-6 dark:bg-blue-700 md:w-6/12'
        onClick={(e) => e.stopPropagation()}
        variants={slideIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <button
          aria-label='Go back'
          className='flex h-4 w-20 items-center justify-between text-xs font-bold'
          onClick={() => setShowAddInvoice(false)}
          type='button'
        >
          <IconArrowLeft />
          Go back
        </button>
        <h1 className='my-6 text-blue-900 dark:text-white md:text-3xl'>New Invoice</h1>
        <AddInvoiceForm setShowAddInvoice={setShowAddInvoice} />
      </motion.div>
    </motion.div>
  );
};

export default NewInvoiceBackdrop;
