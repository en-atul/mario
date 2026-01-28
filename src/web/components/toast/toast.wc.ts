const toastStyles = `
  :host {
    display: block;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
    width: 100%;
    max-width: 24rem;
  }

  .toast {
    border: 1px solid var(--color-slate-200);
    border-radius: 0.5rem;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.12);
    background: var(--color-white);
    overflow: hidden;
  }

  :host([variant="success"]) .toast {
    background: var(--color-success-50);
    border-color: var(--color-success-200);
    color: var(--color-success-900);
  }

  :host([variant="error"]) .toast {
    background: var(--color-danger-50);
    border-color: var(--color-danger-200);
    color: var(--color-danger-900);
  }

  :host([variant="warning"]) .toast {
    background: var(--color-warning-50);
    border-color: var(--color-warning-200);
    color: var(--color-warning-900);
  }

  .body {
    padding: 1rem;
  }

  .title {
    font-weight: 600;
  }

  .description {
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

export class DsToastElement extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'duration', 'title', 'description'];
  }

  private titleEl: HTMLDivElement;
  private descriptionEl: HTMLDivElement;
  private timeoutId: number | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = toastStyles;

    const container = document.createElement('div');
    container.className = 'toast';

    const body = document.createElement('div');
    body.className = 'body';

    this.titleEl = document.createElement('div');
    this.titleEl.className = 'title';

    this.descriptionEl = document.createElement('div');
    this.descriptionEl.className = 'description';

    body.append(this.titleEl, this.descriptionEl);
    container.append(body);
    shadow.append(style, container);
  }

  connectedCallback() {
    this.syncDefaults();
    this.syncContent();
    this.setupTimer();
  }

  attributeChangedCallback() {
    this.syncDefaults();
    this.syncContent();
    this.setupTimer();
  }

  disconnectedCallback() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  private syncDefaults() {
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }
    if (!this.hasAttribute('duration')) {
      this.setAttribute('duration', '5000');
    }

    const variant = this.getAttribute('variant');
    const role = variant === 'error' ? 'alert' : 'status';
    const ariaLive = variant === 'error' ? 'assertive' : 'polite';
    this.setAttribute('role', role);
    this.setAttribute('aria-live', ariaLive);
    this.setAttribute('aria-atomic', 'true');
  }

  private syncContent() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    this.titleEl.textContent = title || '';
    this.descriptionEl.textContent = description || '';
    this.descriptionEl.style.display = description ? 'block' : 'none';
  }

  private setupTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    const durationAttr = this.getAttribute('duration');
    const duration = durationAttr ? Number(durationAttr) : 0;
    if (!Number.isNaN(duration) && duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
      }, duration);
    }
  }
}

export const defineDsToast = () => {
  if (!customElements.get('ds-toast')) {
    customElements.define('ds-toast', DsToastElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsToast();
}
