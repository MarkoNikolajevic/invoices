import { motion } from 'framer-motion';
import IconArrowLeft from './IconArrowLeft';

const InvoiceBackdrop = ({
  title,
  children,
  onClick,
  ...props
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
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
      className='absolute top-0 left-0 h-screen w-full bg-[#000000e1]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      <motion.div
        className='h-screen w-full overflow-scroll rounded-r-[1.25rem] bg-white pt-8 dark:bg-blue-700 md:w-10/12 lg:w-6/12'
        onClick={(e) => e.stopPropagation()}
        variants={slideIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <button
          aria-label='Go back'
          className='ml-6 flex h-4 w-20 items-center justify-between text-xs font-bold'
          onClick={onClick}
          type='button'
        >
          <IconArrowLeft />
          Go back
        </button>
        <h1 className='my-6 ml-6 text-blue-900 dark:text-white'>{title}</h1>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default InvoiceBackdrop;
