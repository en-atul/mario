const labelStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  label {
    font-weight: 600;
    color: var(--color-slate-900);
  }

  :host([variant="muted"]) label {
    color: var(--color-slate-500);
  }

  :host([variant="error"]) label {
    color: var(--color-danger-600);
  }

  :host([size="sm"]) label {
    font-size: 0.75rem;
  }

  :host([size="md"]) label {
    font-size: 0.875rem;
  }

  :host([size="lg"]) label {
    font-size: 1rem;
  }
`;

export class DsLabelElement extends HTMLElement {
  static get observedAttributes() {
    return ['for', 'variant', 'size'];
  }

  private labelEl: HTMLLabelElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = labelStyles;

    this.labelEl = document.createElement('label');
    this.labelEl.append(document.createElement('slot'));

    shadow.append(style, this.labelEl);
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
      this.setAttribute('variant', 'default');
    }
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
  }

  private syncAttributes() {
    const htmlFor = this.getAttribute('for');
    if (htmlFor) {
      this.labelEl.htmlFor = htmlFor;
    }
  }
}

export const defineDsLabel = () => {
  if (!customElements.get('ds-label')) {
    customElements.define('ds-label', DsLabelElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsLabel();
}
