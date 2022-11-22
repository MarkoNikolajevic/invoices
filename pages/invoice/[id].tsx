import type { NextPage } from 'next';
import InvoiceDetail from '../../components/InvoiceDetail';
import supabaseClient from '../../lib/supabase';
import { Invoice } from '../../interface/invoice';

const SingleInvoicePage: NextPage<any> = ({ invoice }: { invoice: Invoice }) => {
  return <InvoiceDetail invoice={invoice} />;
};

export const getStaticPaths = async () => {
  const { data } = await supabaseClient.from('invoices').select('id');
  const paths = data?.map((invoice) => ({
    params: { id: invoice.id }
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: { params: Invoice }) => {
  const { id } = params;
  const { data } = await supabaseClient.from('invoices').select().filter('id', 'eq', id).single();

  return { props: { invoice: data } };
};

export default SingleInvoicePage;
