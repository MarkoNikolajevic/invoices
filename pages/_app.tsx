import { useState, useEffect, createContext } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import supabaseClient from '../lib/supabase'
import { Invoice } from '../interface/invoice'
import '../styles/globals.css'
import Navbar from '../components/Navbar';

export const InvoiceContext = createContext<any>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [invoices, setInvoices] = useState<Invoice | null>();

  const getInvoices = async () => {
    let fetchedInvoice: Invoice | null;

    fetchedInvoice = (await supabaseClient
      .from<Invoice>('invoices')
      .select()
      .order('createdAt', { ascending: false })) as unknown as Invoice;

    setInvoices(fetchedInvoice);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <ThemeProvider attribute='class'>
      <InvoiceContext.Provider value={{ invoices, getInvoices }}>
        <div className='flex min-h-screen flex-col bg-gray-200 transition dark:bg-blue-700 lg:flex-row'>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </InvoiceContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp
