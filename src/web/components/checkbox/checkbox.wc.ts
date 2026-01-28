const checkboxStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  input {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--color-slate-300);
    accent-color: var(--color-primary-600);
    outline: none;
  }

  input:focus-visible {
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export class DsCheckboxElement extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'name', 'value'];
  }

  private inputEl: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = checkboxStyles;

    this.inputEl = document.createElement('input');
    this.inputEl.type = 'checkbox';
    this.inputEl.addEventListener('change', () => {
      if (this.inputEl.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    shadow.append(style, this.inputEl);
  }

  connectedCallback() {
    this.sync();
  }

  attributeChangedCallback() {
    this.sync();
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  private sync() {
    this.inputEl.checked = this.hasAttribute('checked');
    this.inputEl.disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name');
    if (name) this.inputEl.name = name;
    const value = this.getAttribute('value');
    if (value !== null) this.inputEl.value = value;
  }
}

export const defineDsCheckbox = () => {
  if (!customElements.get('ds-checkbox')) {
    customElements.define('ds-checkbox', DsCheckboxElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsCheckbox();
}
