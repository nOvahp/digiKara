import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { toEnglishDigits } from '@/lib/number';
import { cn } from '@/lib/utils';

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const originalValue = e.target.value;
      const englishValue = toEnglishDigits(originalValue);

      // Create a specific event with the modified value if needed,
      // but for controlled inputs, we usually rely on the parent updating the state
      // with the englishValue.
      // However, to be a true "replacement", we should trigger the onChange
      // with the event that has the modified value, OR let the parent handle it.
      // A common pattern for "NumberInput" that force converts is to do it here.

      // Mutating the event target value directly is risky in React,
      // but standard for masking.
      e.target.value = englishValue;

      if (onChange) {
        onChange(e);
      }

      if (onValueChange) {
        onValueChange(englishValue);
      }
    };

    return (
      <Input
        ref={ref}
        type="text" // Keep as text to allow smooth typing before validation/conversion if needed, though we convert immediately
        inputMode="numeric" // Hints mobile keyboards to show numbers
        dir="ltr" // Numbers usually look better LTR, but can be overriden via className
        className={cn('font-mono', className)}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
