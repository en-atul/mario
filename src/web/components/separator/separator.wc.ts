const separatorStyles = `
  :host {
    display: block;
    background: var(--color-slate-200);
  }

  :host([orientation="horizontal"]) {
    height: 1px;
    width: 100%;
  }

  :host([orientation="vertical"]) {
    width: 1px;
    height: 100%;
  }
`;

export class DsSeparatorElement extends HTMLElement {
  static get observedAttributes() {
    return ['orientation'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = separatorStyles;
    shadow.append(style);
  }

  connectedCallback() {
    if (!this.hasAttribute('orientation')) {
      this.setAttribute('orientation', 'horizontal');
    }
    this.setAttribute('role', 'separator');
  }
}

export const defineDsSeparator = () => {
  if (!customElements.get('ds-separator')) {
    customElements.define('ds-separator', DsSeparatorElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsSeparator();
}
