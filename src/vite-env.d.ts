/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'twisty-player': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'experimental-setup-alg'?: string
        'alg'?: string
        'tempo-scale'?: string
        'visualization'?: string
        'background'?: string
        'control-panel'?: string
        'experimental-setup-anchor'?: string
        'experimental-stickering'?: string
      },
      HTMLElement
    >
  }
}
