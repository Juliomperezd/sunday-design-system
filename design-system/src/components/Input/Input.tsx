import { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          className={[styles.input, className].filter(Boolean).join(' ')}
          placeholder=" "
          {...props}
        />
        {placeholder && <label className={styles.label}>{placeholder}</label>}
      </div>
    );
  }
);

Input.displayName = 'Input';
