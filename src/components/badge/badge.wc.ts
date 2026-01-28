const badgeStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    border: 1px solid transparent;
    font-weight: 600;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
  }

  :host([size="sm"]) .badge {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  }

  :host([size="md"]) .badge {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
  }

  :host([size="lg"]) .badge {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  :host([variant="default"]) .badge {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  :host([variant="secondary"]) .badge {
    background: var(--color-slate-200);
    color: var(--color-slate-900);
  }

  :host([variant="destructive"]) .badge {
    background: var(--color-danger-600);
    color: var(--color-white);
  }

  :host([variant="outline"]) .badge {
    background: transparent;
    color: var(--color-slate-950, #0a0f1a);
    border-color: var(--color-slate-300);
  }

  :host([variant="success"]) .badge {
    background: var(--color-success-600);
    color: var(--color-white);
  }

  :host([variant="warning"]) .badge {
    background: var(--color-warning-600);
    color: var(--color-white);
  }
`;

export class DsBadgeElement extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size'];
  }

  private badgeEl: HTMLSpanElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = badgeStyles;

    this.badgeEl = document.createElement('span');
    this.badgeEl.className = 'badge';
    this.badgeEl.append(document.createElement('slot'));

    shadow.append(style, this.badgeEl);
  }

  connectedCallback() {
    this.syncDefaults();
  }

  attributeChangedCallback() {
    this.syncDefaults();
  }

  private syncDefaults() {
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
  }
}

export const defineDsBadge = () => {
  if (!customElements.get('ds-badge')) {
    customElements.define('ds-badge', DsBadgeElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsBadge();
}
