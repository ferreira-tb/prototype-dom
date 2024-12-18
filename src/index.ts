import { element } from './element';
import { urlSearchParams } from './url';
import type { WaitScrollOptions } from './types';

export type * from './types';

declare global {
  interface Document {
    /**
     * Return the first element that is a descendant of node that matches selector.
     * @param selectors CSS selector to match.
     *
     * @throws {Error} If no element is found.
     */
    queryStrict: <T extends Element = Element>(selectors: string) => T;

    /**
     * Query all element descendants of node that match selector, then create an {@link Array} from the result.
     *
     * The values of the array can be customized by providing a `valueFn` function.
     * Defaults to the element itself.
     * @param selector CSS selector to match.
     */
    queryAsArray: <T = Element>(selector: string, valueFn?: (element: Element) => T) => T[];

    /**
     * Query all element descendants of node that match selector, then create a {@link Set} from the result.
     *
     * The values of the set can be customized by providing a `valueFn` function.
     * Defaults to the elements themselves.
     * @param selector CSS selector to match.
     */
    queryAsSet: <T = Element>(selector: string, valueFn?: (element: Element) => T) => Set<T>;

    /**
     * Query all element descendants of node that match selector, then create a {@link Map} from the result.
     *
     * The keys of the map are determined by the required `keyFn` function.
     *
     * The values can be customized by providing a `valueFn` function. Default to the elements themselves.
     * @param selector CSS selector to match.
     * @param keyFn Function that returns the key for each element.
     * @param valueFn Function that returns the value for each element.
     */
    queryAsMap: <T extends Element, K, V = T>(
      selector: string,
      keyFn: (element: T) => K,
      valueFn?: (element: T) => V
    ) => Map<K, V>;

    /**
     * Wait for the first descendant element that matches the given selector to exist.
     * @param selector CSS selector to match.
     * @param timeout Maximum time to wait for the element, in milliseconds.
     */
    waitChild: (selector: string, timeout?: number) => Promise<Element>;

    /**
     * Wait for the first descendant element that matches the given selector to exist.
     * Once found, scroll the element into view.
     * @param selector CSS selector to match.
     * @param options Options to customize the scrolling behavior.
     */
    waitScroll: (selector: string, options?: WaitScrollOptions) => Promise<void>;
  }

  interface Element {
    /**
     * Return the first attribute whose qualified name is `name`.
     * @param name Attribute to search for.
     *
     * @throws {Error} If the attribute is not found.
     */
    getAttributeStrict: (name: string) => string;

    /**
     * Get the first attribute whose qualified name is `name`,
     * then tries to parse the attribute as a floating point number.
     * @param name Attribute to search for.
     *
     * @throws {Error} If the attribute is not found.
     * @throws {TypeError} If the attribute cannot be parsed as a floating point number.
     */
    getAttributeAsFloatStrict: (name: string) => number;

    /**
     * Get the first attribute whose qualified name is `name`,
     * then tries to parse the attribute as an integer using the specified radix.
     * @param name Attribute to search for.
     * @param radix A value between 2 and 36 that specifies the base of the number.
     *
     * @throws {Error} If the attribute is not found.
     * @throws {TypeError} If the attribute cannot be parsed as an integer.
     */
    getAttributeAsIntStrict: (name: string, radix?: number) => number;

    /**
     * Return the text content of the element.
     *
     * @throws {Error} If the element has no text content.
     */
    getTextStrict: () => string;

    /**
     * Get the text content of the element, then tries to parse it as an integer.
     * @param radix A value between 2 and 36 that specifies the base of the number.
     *
     * @throws {Error} If the element has no text content.
     * @throws {TypeError} If the text content cannot be parsed as an integer.
     */
    getTextAsIntStrict: (radix?: number) => number;

    /**
     * Get the text content of the element, then tries to parse it as a floating point number.
     *
     * @throws {Error} If the element has no text content.
     * @throws {TypeError} If the text content cannot be parsed as a floating point number.
     */
    getTextAsFloatStrict: () => number;

    /**
     * Query all element descendants of node that match selector, then create an {@link Array} from the result.
     *
     * The values of the array can be customized by providing a `valueFn` function.
     * Defaults to the element itself.
     * @param selector CSS selector to match.
     */
    queryAsArray: <T = Element>(selector: string, valueFn?: (element: Element) => T) => T[];

    /**
     * Query all element descendants of node that match selector, then create a {@link Set} from the result.
     *
     * The values of the set can be customized by providing a `valueFn` function.
     * Defaults to the elements themselves.
     * @param selector CSS selector to match.
     */
    queryAsSet: <T = Element>(selector: string, valueFn?: (element: Element) => T) => Set<T>;

    /**
     * Return the first element that is a descendant of node that matches selector.
     * @param selectors CSS selector to match.
     *
     * @throws {Error} If no element is found.
     */
    queryStrict: <T extends Element>(selector: string) => T;

    /**
     * Query all element descendants of node that match selector, then create a {@link Map} from the result.
     *
     * The keys of the map are determined by the required `keyFn` function.
     *
     * The values can be customized by providing a `valueFn` function. Default to the elements themselves.
     * @param selector CSS selector to match.
     * @param keyFn Function that returns the key for each element.
     * @param valueFn Function that returns the value for each element.
     */
    queryAsMap: <T extends Element, K, V = T>(
      selector: string,
      keyFn: (element: T) => K,
      valueFn?: (element: T) => V
    ) => Map<K, V>;

    /**
     * Wait for the first descendant element that matches the given selector to exist.
     * @param selector CSS selector to match.
     * @param timeout Maximum time to wait for the element, in milliseconds.
     */
    waitChild: (selector: string, timeout?: number) => Promise<Element>;

    /**
     * Wait for the first descendant element that matches the given selector to exist.
     * Once found, scroll the element into view.
     * @param selector CSS selector to match.
     * @param options Options to customize the scrolling behavior.
     */
    waitScroll: (selector: string, options?: WaitScrollOptions) => Promise<void>;
  }

  interface URLSearchParams {
    /**
     * Return the first value associated to the given search parameter.
     * @param name The name of the search parameter to get.
     *
     * @throws {Error} If the search parameter is not found.
     */
    getStrict: (name: string) => string;

    /**
     * Get the first value associated to the given search parameter, then tries to parse it as an integer.
     * The returned value may be `NaN` if it cannot be parsed as an integer.
     * To throw an error if the value cannot be parsed, use {@link getAsIntegerStrict} instead.
     * @param name The name of the search parameter to get.
     * @param radix A value between 2 and 36 that specifies the base of the number.
     */
    getAsInteger: (name: string, radix?: number) => number | null;

    /**
     * Get the first value associated to the given search parameter, then tries to parse it as an integer.
     * @param name The name of the search parameter to get.
     * @param radix A value between 2 and 36 that specifies the base of the number.
     *
     * @throws {Error} If the search parameter is not found.
     * @throws {TypeError} If the value cannot be parsed as an integer.
     */
    getAsIntegerStrict: (name: string, radix?: number) => number;
  }
}

Document.prototype.queryStrict = element.queryStrict<Document>();
Document.prototype.queryAsArray = element.queryAsArray<Document>();
Document.prototype.queryAsSet = element.queryAsSet<Document>();
Document.prototype.queryAsMap = element.queryAsMap<Document>();
Document.prototype.waitScroll = element.waitScroll<Document>();
Document.prototype.waitChild = element.waitChild<Document>();

Element.prototype.getAttributeStrict = element.getAttributeStrict<Element>();
Element.prototype.getAttributeAsFloatStrict = element.getAttributeAsFloatStrict<Element>();
Element.prototype.getAttributeAsIntStrict = element.getAttributeAsIntStrict<Element>();
Element.prototype.getTextStrict = element.getTextStrict<Element>();
Element.prototype.getTextAsIntStrict = element.getTextAsIntStrict<Element>();
Element.prototype.getTextAsFloatStrict = element.getTextAsFloatStrict<Element>();
Element.prototype.queryStrict = element.queryStrict<Element>();
Element.prototype.queryAsArray = element.queryAsArray<Element>();
Element.prototype.queryAsSet = element.queryAsSet<Element>();
Element.prototype.queryAsMap = element.queryAsMap<Element>();
Element.prototype.waitScroll = element.waitScroll<Element>();
Element.prototype.waitChild = element.waitChild<Element>();

URLSearchParams.prototype.getStrict = urlSearchParams.getStrict();
URLSearchParams.prototype.getAsInteger = urlSearchParams.getAsInteger();
URLSearchParams.prototype.getAsIntegerStrict = urlSearchParams.getAsIntegerStrict();

export type { element, urlSearchParams };
