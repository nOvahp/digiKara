import * as React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
        onChange={(e) => {
          const originalValue = e.target.value;
          let newValue = originalValue;
          let hasEnglishChars = false;

          if (type === 'number') {
            // Enforce strictly numeric input (0-9)
            newValue = originalValue.replace(/[^0-9]/g, '');
          } else if (!type || type === 'text' || type === 'search') {
            // Check if there are English characters before replacing
            if (/[a-zA-Z]/.test(originalValue)) {
              hasEnglishChars = true;
            }
            // Enforce Persian input by blocking English letters
            newValue = originalValue.replace(/[a-zA-Z]/g, '');
          }

          if (newValue !== originalValue) {
            e.target.value = newValue;
            if (hasEnglishChars) {
              toast.warning('لطفا کیبورد خود را فارسی کنید', {
                id: 'input-lang-warning',
                duration: 2000,
              });
            }
          }

          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
