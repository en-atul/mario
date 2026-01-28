const inputStyles = `
  :host {
    display: block;
    width: 100%;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
    --input-height: 2.5rem;
    --input-font-size: 0.875rem;
    --input-padding-x: 0.75rem;
    --input-padding-y: 0.5rem;
  }

  :host([size="sm"]) {
    --input-height: 2rem;
    --input-font-size: 0.75rem;
  }

  :host([size="md"]) {
    --input-height: 2.5rem;
    --input-font-size: 0.875rem;
  }

  :host([size="lg"]) {
    --input-height: 3rem;
    --input-font-size: 1rem;
  }

  .root {
    position: relative;
    width: 100%;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: var(--input-height);
    padding: var(--input-padding-y) var(--input-padding-x);
    font-size: var(--input-font-size);
    line-height: 1.25rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-slate-200);
    background: var(--color-white);
    color: var(--color-slate-900);
    outline: none;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }

  input::placeholder {
    color: var(--color-slate-500);
  }

  input:focus-visible {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }

  :host([variant="error"]) input {
    border-color: var(--color-danger-600);
  }

  :host([variant="error"]) input:focus-visible {
    border-color: var(--color-danger-600);
    box-shadow: 0 0 0 2px var(--color-danger-200);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: var(--color-slate-50);
  }

  .currency {
    position: absolute;
    left: var(--input-padding-x);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-slate-500);
    pointer-events: none;
    font-size: var(--input-font-size);
  }

  :host(:not([currency])) .currency {
    display: none;
  }

  :host([currency]) input {
    padding-left: calc(var(--input-padding-x) * 2 + 0.5rem);
  }
`;

export class DsInputElement extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
      'disabled',
      'placeholder',
      'type',
      'name',
      'id',
      'readonly',
      'required',
      'size',
      'variant',
      'currency',
      'currency-symbol',
    ];
  }

  private inputEl: HTMLInputElement;
  private currencyEl: HTMLSpanElement;
  private valueInternal = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = inputStyles;

    const root = document.createElement('div');
    root.className = 'root';

    this.currencyEl = document.createElement('span');
    this.currencyEl.className = 'currency';
    this.currencyEl.textContent = this.getAttribute('currency-symbol') || '$';

    this.inputEl = document.createElement('input');
    this.inputEl.addEventListener('input', this.handleInput);
    this.inputEl.addEventListener('change', () => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    root.append(this.currencyEl, this.inputEl);
    shadow.append(style, root);
  }

  connectedCallback() {
    this.syncDefaults();
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncDefaults();
    this.syncFromAttributes();
  }

  get value() {
    return this.valueInternal;
  }

  set value(nextValue: string) {
    const normalized = nextValue ?? '';
    this.valueInternal = normalized;
    if (this.inputEl.value !== normalized) {
      this.inputEl.value = normalized;
    }
  }

  private handleInput = () => {
    if (this.hasAttribute('currency')) {
      const formatted = this.formatCurrency(this.inputEl.value);
      if (formatted !== this.inputEl.value) {
        this.inputEl.value = formatted;
      }
      this.valueInternal = formatted;
    } else {
      this.valueInternal = this.inputEl.value;
    }

    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  };

  private formatCurrency(value: string) {
    const numericValue = value.replace(/[^\d.]/g, '');
    if (!numericValue) return '';
    const number = parseFloat(numericValue);
    if (Number.isNaN(number)) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }

  private syncDefaults() {
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }
  }

  private syncFromAttributes() {
    this.inputEl.placeholder = this.getAttribute('placeholder') || '';
    this.inputEl.name = this.getAttribute('name') || '';
    this.inputEl.id = this.getAttribute('id') || '';

    const typeAttr = this.getAttribute('type');
    if (this.hasAttribute('currency')) {
      this.inputEl.type = 'text';
    } else if (typeAttr) {
      this.inputEl.type = typeAttr;
    } else {
      this.inputEl.type = 'text';
    }

    this.inputEl.disabled = this.hasAttribute('disabled');
    this.inputEl.readOnly = this.hasAttribute('readonly');
    this.inputEl.required = this.hasAttribute('required');

    const symbol = this.getAttribute('currency-symbol') || '$';
    this.currencyEl.textContent = symbol;

    const valueAttr = this.getAttribute('value');
    if (valueAttr !== null) {
      const nextValue = this.hasAttribute('currency')
        ? this.formatCurrency(valueAttr)
        : valueAttr;
      this.value = nextValue;
    }
  }
}

export const defineDsInput = () => {
  if (!customElements.get('ds-input')) {
    customElements.define('ds-input', DsInputElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsInput();
}
