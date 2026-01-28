const selectStyles = `
  :host {
    display: inline-block;
    width: 100%;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
    --select-height: 2.5rem;
    --select-font-size: 0.875rem;
  }

  :host([size="sm"]) {
    --select-height: 2rem;
    --select-font-size: 0.75rem;
  }

  :host([size="md"]) {
    --select-height: 2.5rem;
    --select-font-size: 0.875rem;
  }

  :host([size="lg"]) {
    --select-height: 3rem;
    --select-font-size: 1rem;
  }

  select {
    width: 100%;
    height: var(--select-height);
    padding: 0.5rem 0.75rem;
    font-size: var(--select-font-size);
    border-radius: 0.375rem;
    border: 1px solid var(--color-slate-200);
    background: var(--color-white);
    color: var(--color-slate-900);
    outline: none;
  }

  select:focus-visible {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }

  :host([variant="error"]) select {
    border-color: var(--color-danger-600);
  }

  :host([variant="error"]) select:focus-visible {
    border-color: var(--color-danger-600);
    box-shadow: 0 0 0 2px var(--color-danger-200);
  }

  select:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: var(--color-slate-50);
  }
`;

export class DsSelectElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'name', 'id', 'size', 'variant'];
  }

  private selectEl: HTMLSelectElement;
  private observer: MutationObserver | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = selectStyles;

    this.selectEl = document.createElement('select');
    this.selectEl.addEventListener('change', () => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    shadow.append(style, this.selectEl);
  }

  connectedCallback() {
    this.syncDefaults();
    this.syncAttributes();
    this.syncOptions();
    this.observer = new MutationObserver(() => this.syncOptions());
    this.observer.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  attributeChangedCallback() {
    this.syncDefaults();
    this.syncAttributes();
  }

  private syncDefaults() {
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }
  }

  private syncAttributes() {
    this.selectEl.disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name');
    if (name) this.selectEl.name = name;
    const id = this.getAttribute('id');
    if (id) this.selectEl.id = id;
  }

  private syncOptions() {
    this.selectEl.innerHTML = '';
    Array.from(this.children).forEach((child) => {
      if (child instanceof HTMLOptionElement || child instanceof HTMLOptGroupElement) {
        this.selectEl.append(child.cloneNode(true));
      }
    });
  }
}

export const defineDsSelect = () => {
  if (!customElements.get('ds-select')) {
    customElements.define('ds-select', DsSelectElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsSelect();
}
