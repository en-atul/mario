const switchStyles = `
  :host {
    display: inline-flex;
    font-family: var(--font-family-sans, "Inter Variable", sans-serif);
  }

  label {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  .track {
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 9999px;
    background: var(--color-slate-200);
    position: relative;
    transition: background-color 150ms ease;
  }

  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
    background: var(--color-white);
    border: 1px solid var(--color-slate-300);
    transition: transform 150ms ease, border-color 150ms ease;
  }

  :host([checked]) .track {
    background: var(--color-primary-600);
  }

  :host([checked]) .thumb {
    transform: translateX(1.25rem);
    border-color: var(--color-white);
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export class DsSwitchElement extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled'];
  }

  private inputEl: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = switchStyles;

    const label = document.createElement('label');
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

    const track = document.createElement('span');
    track.className = 'track';
    const thumb = document.createElement('span');
    thumb.className = 'thumb';
    track.append(thumb);

    label.append(this.inputEl, track);
    shadow.append(style, label);
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
  }
}

export const defineDsSwitch = () => {
  if (!customElements.get('ds-switch')) {
    customElements.define('ds-switch', DsSwitchElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsSwitch();
}
