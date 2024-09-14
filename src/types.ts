export interface ScrollAsyncOptions extends ScrollIntoViewOptions {
  timeout?: number;

  /** @default true */
  throwOnTimeout?: boolean;
}
