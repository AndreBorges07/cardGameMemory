// Esse arquivo resolveu o erro que acontecia nas tags de como div e H1

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
