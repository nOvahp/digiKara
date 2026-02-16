import * as React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base font-medium shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
      onChange={(e) => {
        const originalValue = e.target.value;
        let hasEnglishChars = false;

        // Check for English characters
        if (/[a-zA-Z]/.test(originalValue)) {
          hasEnglishChars = true;
        }

        // Enforce Persian input by blocking English letters
        const newValue = originalValue.replace(/[a-zA-Z]/g, '');

        if (newValue !== originalValue) {
          e.target.value = newValue;
          if (hasEnglishChars) {
            toast.warning('لطفا کیبورد خود را فارسی کنید', {
              id: 'textarea-lang-warning',
              duration: 2000,
            });
          }
        }

        if (props.onChange) {
          props.onChange(e);
        }
      }}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
