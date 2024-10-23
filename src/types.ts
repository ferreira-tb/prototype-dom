export interface WaitScrollOptions extends ScrollIntoViewOptions {
  timeout?: number;

  /** @default true */
  throwOnTimeout?: boolean;
}
