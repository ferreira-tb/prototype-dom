function getAttributeStrict<E extends Element>() {
  return function (this: E, attribute: string): string {
    const attr = this.getAttribute(attribute)?.trim();
    if (typeof attr !== 'string' || attr.length === 0) {
      throw new Error(`attribute "${attribute}" not found`);
    }

    return attr;
  };
}

function getAttributeAsFloatStrict<E extends Element>() {
  return function (this: E, attribute: string): number {
    const attr = this.getAttributeStrict(attribute);
    const value = Number.parseFloat(attr.trim());

    if (!Number.isFinite(value)) {
      throw new TypeError(`could not parse attribute "${attribute}" as float`);
    }

    return value;
  };
}

function getAttributeAsIntStrict<E extends Element>() {
  return function (this: E, attribute: string, radix = 10): number {
    const attr = this.getAttributeStrict(attribute);
    const value = Number.parseInt(attr.trim(), radix);

    if (!Number.isInteger(value)) {
      throw new TypeError(`could not parse attribute "${attribute}" as integer`);
    }

    return value;
  };
}

function getTextStrict<E extends Element>() {
  return function (this: E): string {
    const text = this.textContent?.trim();
    if (typeof text !== 'string' || text.length === 0) {
      throw new Error('element has no text content');
    }

    return text;
  };
}

function getTextAsIntStrict<E extends Element>() {
  return function (this: E, radix = 10): number {
    const value = Number.parseInt(this.getTextStrict(), radix);
    if (!Number.isInteger(value)) {
      throw new TypeError('could not parse text content as integer');
    }

    return value;
  };
}

function getTextAsFloatStrict<E extends Element>() {
  return function (this: E): number {
    const value = Number.parseFloat(this.getTextStrict());
    if (!Number.isFinite(value)) {
      throw new TypeError('could not parse text content as float');
    }

    return value;
  };
}

function queryStrict<E extends Document | Element>() {
  return function <T extends Element = Element>(this: E, selector: string): T {
    const element = this.querySelector<T>(selector);
    if (!element) throw new Error(`no element found for selector "${selector}"`);
    return element;
  };
}

function queryAsArray<E extends Document | Element>() {
  return function <T = Element>(this: E, selector: string, valueFn?: (element: Element) => T): T[] {
    valueFn ??= (element) => element as T;
    const elements = this.querySelectorAll(selector);
    return Array.from(elements, valueFn);
  };
}

function queryAsSet<E extends Document | Element>() {
  return function <T = Element>(
    this: E,
    selector: string,
    valueFn?: (element: Element) => T
  ): Set<T> {
    valueFn ??= (element: Element) => element as T;
    const elements = this.queryAsArray<T>(selector, valueFn);
    return new Set(elements);
  };
}

function queryAsMap<E extends Document | Element>() {
  return function <T extends Element, K, V = T>(
    this: E,
    selector: string,
    keyFn: (element: T) => K,
    valueFn?: (element: T) => V
  ): Map<K, V> {
    valueFn ??= (element: T) => element as unknown as V;
    const elements = this.queryAsArray<T>(selector);
    const map = new Map<K, V>();

    for (const element of elements) {
      const key = keyFn(element);
      const value = valueFn(element);
      map.set(key, value);
    }

    return map;
  };
}

function waitChild<E extends Document | Element>() {
  return function <T extends Element = Element>(
    this: E,
    selector: string,
    timeoutMillis = 300_000
  ): Promise<T> {
    let element = this.querySelector<T>(selector);
    if (element) return Promise.resolve(element);

    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(onTimeout, timeoutMillis);
      const interval = setInterval(onInterval.bind(this), 50);

      function onInterval(this: E) {
        element = this.querySelector<T>(selector);
        if (element) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve(element);
        }
      }

      function onTimeout() {
        clearInterval(interval);
        reject(new Error(`timeout waiting for element: ${selector}`));
      }
    });
  };
}

export const element = {
  getAttributeStrict,
  getAttributeAsFloatStrict,
  getAttributeAsIntStrict,
  getTextStrict,
  getTextAsIntStrict,
  getTextAsFloatStrict,
  queryStrict,
  queryAsArray,
  queryAsSet,
  queryAsMap,
  waitChild
};
