const buttonStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  button {
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.1);
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
    outline: none;
  }

  button:focus-visible {
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([size="small"]) button {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
  }

  :host([size="medium"]) button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  :host([size="large"]) button {
    padding: 0.625rem 1rem;
    font-size: 1rem;
  }

  :host([variant="primary"]) button {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  :host([variant="primary"]) button:hover {
    background: var(--color-primary-500);
  }

  :host([variant="primary"]) button:active {
    background: var(--color-primary-400);
  }

  :host([variant="secondary"]) button {
    background: var(--color-white);
    color: var(--color-slate-900);
    border-color: var(--color-slate-300);
  }

  :host([variant="secondary"]) button:hover {
    background: var(--color-slate-50);
  }

  :host([variant="secondary"]) button:active {
    background: var(--color-slate-100);
  }

  :host([variant="destructive"]) button {
    background: var(--color-danger-600);
    color: var(--color-white);
  }

  :host([variant="destructive"]) button:hover {
    background: var(--color-danger-500);
  }

  :host([variant="destructive"]) button:active {
    background: var(--color-danger-400);
  }
`;

export class DsButtonElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant', 'size', 'type'];
  }

  private buttonEl: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = buttonStyles;

    this.buttonEl = document.createElement('button');
    this.buttonEl.append(document.createElement('slot'));

    shadow.append(style, this.buttonEl);
  }

  connectedCallback() {
    this.syncDefaults();
    this.syncAttributes();
  }

  attributeChangedCallback() {
    this.syncDefaults();
    this.syncAttributes();
  }

  private syncDefaults() {
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'secondary');
    }
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'medium');
    }
    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }
  }

  private syncAttributes() {
    this.buttonEl.disabled = this.hasAttribute('disabled');
    const type = this.getAttribute('type') as
      | 'button'
      | 'submit'
      | 'reset'
      | null;
    this.buttonEl.type = type || 'button';
  }
}

export const defineDsButton = () => {
  if (!customElements.get('ds-button')) {
    customElements.define('ds-button', DsButtonElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsButton();
}
