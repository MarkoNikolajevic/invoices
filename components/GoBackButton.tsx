import { useRouter } from 'next/router';
import IconArrowLeft from './IconArrowLeft';

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button
      aria-label='Go back'
      className='flex h-4 w-20 items-center justify-between text-xs font-bold'
      onClick={() => router.back()}
      type='button'
    >
      <IconArrowLeft />
      Go back
    </button>
  );
};

export default GoBackButton;
