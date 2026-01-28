const linkStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  a {
    text-decoration: none;
    font-weight: 500;
    color: var(--color-primary-600);
    transition: color 150ms ease;
  }

  a:hover {
    color: var(--color-primary-500);
  }

  :host([variant="muted"]) a {
    color: var(--color-slate-500);
  }

  :host([variant="destructive"]) a {
    color: var(--color-danger-600);
  }

  :host([size="sm"]) a {
    font-size: 0.75rem;
  }

  :host([size="md"]) a {
    font-size: 0.875rem;
  }

  :host([size="lg"]) a {
    font-size: 1rem;
  }
`;

export class DsLinkElement extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'target', 'rel', 'variant', 'size'];
  }

  private anchorEl: HTMLAnchorElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = linkStyles;

    this.anchorEl = document.createElement('a');
    this.anchorEl.append(document.createElement('slot'));

    shadow.append(style, this.anchorEl);
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
    const href = this.getAttribute('href');
    if (href) this.anchorEl.href = href;
    const target = this.getAttribute('target');
    if (target) this.anchorEl.target = target;
    const rel = this.getAttribute('rel');
    if (rel) this.anchorEl.rel = rel;
  }
}

export const defineDsLink = () => {
  if (!customElements.get('ds-link')) {
    customElements.define('ds-link', DsLinkElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsLink();
}
