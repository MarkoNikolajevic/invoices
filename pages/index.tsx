import type { NextPage } from 'next'
import { useContext, useState } from 'react';
import { InvoiceContext } from './_app';
import Header from '../components/Header';
import EmptyInvoice from '../components/EmptyInvoice';
import InvoicePreview from '../components/InvoicePreview';
import { AnimatePresence } from 'framer-motion';
import InvoiceBackdrop from '../components/InvoiceBackdrop';
import LoadingIcon from '../components/LoadingIcon';
import AddInvoiceForm from '../components/AddInvoiceForm';

const Home: NextPage = () => {
  const { invoices } = useContext(InvoiceContext);
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  return (
    <main className='relative w-full'>
      <div className='mx-6 mt-8 flex flex-col md:mx-12 md:mt-14 lg:mx-auto lg:mt-18 lg:w-4/5'>
        <Header setShowAddInvoice={setShowAddInvoice} />
        {invoices?.data.length > 0 && <InvoicePreview />}
        {invoices?.data.length === 0 && <EmptyInvoice />}
      </div>
      <AnimatePresence>
        {showAddInvoice && (
          <InvoiceBackdrop onClick={() => setShowAddInvoice(false)} title='New Invoice'>
            <AddInvoiceForm setShowAddInvoice={setShowAddInvoice} />
          </InvoiceBackdrop>
        )}
      </AnimatePresence>
      {!invoices && (
        <div className='absolute top-0 left-0 right-0 flex h-screen items-center justify-center  bg-[#000000e1]'>
          <LoadingIcon />
        </div>
      )}
    </main>
  );
};

export default Home
