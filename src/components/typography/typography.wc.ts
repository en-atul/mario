const typographyStyles = `
  :host {
    display: block;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
    color: var(--color-slate-900);
  }

  .text {
    margin: 0;
  }

  :host([variant="h1"]) .text {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  :host([variant="h2"]) .text {
    font-size: 1.875rem;
    font-weight: 700;
    border-bottom: 1px solid var(--color-slate-200);
    padding-bottom: 0.5rem;
  }

  :host([variant="h3"]) .text {
    font-size: 1.5rem;
    font-weight: 600;
  }

  :host([variant="h4"]) .text {
    font-size: 1.25rem;
    font-weight: 600;
  }

  :host([variant="h5"]) .text {
    font-size: 1.125rem;
    font-weight: 600;
  }

  :host([variant="h6"]) .text {
    font-size: 1rem;
    font-weight: 600;
  }

  :host([variant="p"]) .text {
    font-size: 1rem;
    line-height: 1.75rem;
  }

  :host([variant="lead"]) .text {
    font-size: 1.25rem;
    color: var(--color-slate-600);
  }

  :host([variant="large"]) .text {
    font-size: 1.125rem;
    font-weight: 600;
  }

  :host([variant="small"]) .text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  :host([variant="muted"]) .text {
    font-size: 0.875rem;
    color: var(--color-slate-600);
  }

  :host([variant="blockquote"]) .text {
    margin-top: 1.5rem;
    padding-left: 1.5rem;
    border-left: 4px solid var(--color-slate-300);
    font-style: italic;
  }

  :host([variant="code"]) .text {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    background: var(--color-slate-100);
    padding: 0.2rem 0.3rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  :host([variant="pre"]) .text {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    background: var(--color-slate-950);
    color: var(--color-white);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }
`;

export class DsTypographyElement extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
  }

  private textEl: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = typographyStyles;

    this.textEl = document.createElement('div');
    this.textEl.className = 'text';
    this.textEl.append(document.createElement('slot'));

    shadow.append(style, this.textEl);
  }

  connectedCallback() {
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'p');
    }
  }
}

export const defineDsTypography = () => {
  if (!customElements.get('ds-typography')) {
    customElements.define('ds-typography', DsTypographyElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsTypography();
}
