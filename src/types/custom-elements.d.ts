import type React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ds-badge': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
        size?: 'sm' | 'md' | 'lg';
      };
      'ds-button': React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      > & {
        variant?: 'primary' | 'secondary' | 'destructive';
        size?: 'small' | 'medium' | 'large';
      };
      'ds-checkbox': React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > & {
        checked?: boolean;
      };
      'ds-input': React.DetailedHTMLProps<
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        HTMLInputElement
      > & {
        size?: 'sm' | 'md' | 'lg';
        variant?: 'default' | 'error';
        currency?: boolean;
        'currency-symbol'?: string;
      };
      'ds-label': React.DetailedHTMLProps<
        React.LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      > & {
        variant?: 'default' | 'muted' | 'error';
        size?: 'sm' | 'md' | 'lg';
      };
      'ds-link': React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      > & {
        variant?: 'default' | 'muted' | 'destructive';
        size?: 'sm' | 'md' | 'lg';
      };
      'ds-radio': React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > & {
        checked?: boolean;
      };
      'ds-select': React.DetailedHTMLProps<
        Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
        HTMLSelectElement
      > & {
        size?: 'sm' | 'md' | 'lg';
        variant?: 'default' | 'error';
      };
      'ds-separator': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        orientation?: 'horizontal' | 'vertical';
      };
      'ds-skeleton': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'ds-switch': React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > & {
        checked?: boolean;
      };
      'ds-toast': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?: 'default' | 'success' | 'error' | 'warning';
        title?: string;
        description?: string;
        duration?: number;
      };
      'ds-typography': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?:
          | 'h1'
          | 'h2'
          | 'h3'
          | 'h4'
          | 'h5'
          | 'h6'
          | 'p'
          | 'lead'
          | 'large'
          | 'small'
          | 'muted'
          | 'blockquote'
          | 'code'
          | 'pre';
      };
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
    'ds-badge': HTMLElement;
    'ds-button': HTMLElement;
    'ds-checkbox': HTMLElement;
    'ds-input': HTMLElement;
    'ds-label': HTMLElement;
    'ds-link': HTMLElement;
    'ds-radio': HTMLElement;
    'ds-select': HTMLElement;
    'ds-separator': HTMLElement;
    'ds-skeleton': HTMLElement;
    'ds-switch': HTMLElement;
    'ds-toast': HTMLElement;
    'ds-typography': HTMLElement;
    'mario-input-v2': HTMLElement;
  }
}

export {};
