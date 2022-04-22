import { Invoice } from '../interface/invoice';
import { cn } from '../utils/classes';

const InvoiceStatus = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div
      className={cn(
        'flex h-10 w-[6.5rem] items-center justify-center rounded-md',
        invoice?.status === 'paid'
          ? 'bg-status-paid/[0.06]'
          : invoice?.status === 'pending'
          ? 'bg-status-pending/[0.06]'
          : 'bg-status-draft/[0.06]'
      )}
    >
      <p
        className={cn(
          'flex items-center text-xs font-bold capitalize',
          invoice?.status === 'paid'
            ? 'text-status-paid'
            : invoice?.status === 'pending'
            ? 'text-status-pending'
            : 'test-status-draft'
        )}
      >
        <span className='mr-2 block h-2 w-2 rounded-full bg-current'></span>
        {invoice?.status}
      </p>
    </div>
  );
};

export default InvoiceStatus;
