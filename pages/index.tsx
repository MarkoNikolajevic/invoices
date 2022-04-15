import type { NextPage } from 'next'
import { useContext, useState } from 'react';
import { InvoiceContext } from './_app';
import Header from '../components/Header';
import EmptyInvoice from '../components/EmptyInvoice';
import InvoicePreview from '../components/InvoicePreview';
import { AnimatePresence } from 'framer-motion';
import NewInvoiceBackdrop from '../components/NewInvoiceBackdrop';

const Home: NextPage = () => {
  const { invoices } = useContext(InvoiceContext);
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  return (
    <main className='relative w-full'>
      <div className='mx-6 mt-8 flex flex-col md:mx-12 md:mt-14 lg:mx-auto lg:mt-18 lg:w-4/5'>
        <Header setShowAddInvoice={setShowAddInvoice} />
        {!invoices && <div>Loading...</div>}
        {invoices?.data.length > 0 && <InvoicePreview />}
        {invoices?.data.length === 0 && <EmptyInvoice />}
      </div>
      <AnimatePresence>
        {showAddInvoice && <NewInvoiceBackdrop setShowAddInvoice={setShowAddInvoice} />}
      </AnimatePresence>
    </main>
  );
};

export default Home
