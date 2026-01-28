const skeletonStyles = `
  :host {
    display: block;
    background: var(--color-slate-200);
    border-radius: 0.375rem;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;

export class DsSkeletonElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = skeletonStyles;
    shadow.append(style);
  }
}

export const defineDsSkeleton = () => {
  if (!customElements.get('ds-skeleton')) {
    customElements.define('ds-skeleton', DsSkeletonElement);
  }
};

if (typeof window !== 'undefined') {
  defineDsSkeleton();
}
