import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-base font-bold transition-colors',
  {
    variants: {
      variant: {
        purple: 'bg-purple-500 text-white hover:bg-purple-400',
        grey: 'bg-grey-100 text-grey-400 dark:text-grey-300 hover:bg-grey-300 dark:bg-blue-600 dark:hover:bg-white',
        blue: 'bg-blue-600 text-grey-500 hover:bg-blue-900 dark:text-grey-300',
        red: 'bg-red-500 text-white hover:bg-red-400'
      },
      size: {
        default: 'px-6 py-4',
        full: 'h-12 w-full',
        icon: 'p-2'
      }
    },
    defaultVariants: {
      variant: 'purple',
      size: 'default'
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const ButtonComponent = asChild ? Slot : 'button';
    return (
      <ButtonComponent
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
