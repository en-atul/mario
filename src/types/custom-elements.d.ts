import type React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'mario-input-v2': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        value?: string;
        placeholder?: string;
        type?: string;
        name?: string;
        id?: string;
        disabled?: boolean;
        readonly?: boolean;
        readOnly?: boolean;
        required?: boolean;
        size?: 'sm' | 'md' | 'lg';
        variant?: 'default' | 'error';
        currency?: boolean;
        currencySymbol?: string;
        'currency-symbol'?: string;
      };
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mario-input-v2': HTMLElement;
  }
}

export {};
