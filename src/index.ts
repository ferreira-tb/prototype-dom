declare global {
    interface ArrayConstructor {
        /**
         * Creates a new array from the provided elements.
         * @param source Elements to create the array from. If this is a string, it will be treated as a CSS selector.
         * @param valueSelector Function that returns the value for each element.
         **/
        fromElements<T extends Element[] | NodeList | string, V>(source: T, valueSelector: (element: Element) => V): V[];
    }

    interface Document {
        /**
         * Returns the first element that is a descendant of node that matches selectors.
         * Throws an error if no element is found.
         * @param selector CSS selector to match.
         */
        queryStrict<T extends Element>(selector: string): T;
        /**
         * Query all element descendants of node that match selectors, then create an array from the result.
         * The values of the array can be customized by providing a `valueSelector` function.
         * Defaults to the element itself.
         * @param selector CSS selector to match.
         */
        queryAsArray<T = Element>(selector: string, valueSelector?: (element: Element) => T): T[];
        /**
         * Query all element descendants of node that match selectors, then create a `Set` from the result.
         * The values of the set can be customized by providing a `valueSelector` function.
         * Defaults to the element itself.
         * @param selector CSS selector to match.
         */
        queryAsSet<T = Element>(selector: string, valueSelector?: (element: Element) => T): Set<T>;
        /**
         * Returns all element descendants of node that match selectors.
         * However, unlike `querySelectorAll`, this method returns a `Map` instead of a `NodeList`.
         * 
         * The keys of the map are determined by the `keySelector` function that must be provided.
         * The values can also be customized by providing a `valueSelector` function, but defaults to the element itself.
         * @param selector CSS selector to match.
         * @param keySelector Function that returns the key for each element.
         * @param valueSelector Function that returns the value for each element.
         */
        queryAsMap<T extends Element, K, V = T>(
            selector: string,
            keySelector: (element: T) => K,
            valueSelector?: (element: T) => V
        ): Map<K, V>;
    }

    interface Element {
        /**
         * Returns element's first attribute whose qualified name is `qualifiedName`.
         * However, unlike `getAttribute`, throws an error if the attribute is not found.
         * @param qualifiedName Attribute to search for.
         */
        getAttributeStrict<T extends string>(qualifiedName: string): T;
        /**
         * Returns element's first attribute whose qualified name is `qualifiedName`, throwing an error if the attribute is not found.
         * The tries to parse the attribute as a floating point number. If the parsing fails, an error is thrown.
         * @param qualifiedName Attribute to search for.
         * @param allowNegative Determines whether negative numbers are allowed.
         * This will throw an error if the attribute is a negative number and this parameter is set to `false`.
         * It defaults to `false`.
         */
        getAttributeAsFloatStrict(qualifiedName: string, allowNegative?: boolean): number;
        /**
         * Returns element's first attribute whose qualified name is `qualifiedName`, throwing an error if the attribute is not found.
         * The tries to parse the attribute as an integer. If the parsing fails, an error is thrown.
         * @param qualifiedName Attribute to search for.
         * @param radix A value between 2 and 36 that specifies the base of the number in string.
         * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.
         * @param allowNegative Determines whether negative numbers are allowed.
         * This will throw an error if the attribute is a negative number and this parameter is set to `false`.
         * It defaults to `false`.
         */
        getAttributeAsIntStrict(qualifiedName: string, radix?: number, allowNegative?: boolean): number;
        /** Returns the text content of the element, throwing an error if it has no text content. */
        getTextContentStrict<T extends string>(): T;
        /** Tries to parse the text content of the element as an integer. If the parsing fails, an error is thrown. */
        parseIntStrict(radix?: number, allowNegative?: boolean): number;
        /** Tries to parse the text content of the element as a floating point number. If the parsing fails, an error is thrown. */
        parseFloatStrict(allowNegative?: boolean): number;
        /**
         * Returns the first element that is a descendant of node that matches selectors.
         * Throws an error if no element is found.
         * @param selector CSS selector to match.
         */
        queryStrict<T extends Element>(selector: string): T;
        /**
         * Query all element descendants of node that match selectors, then create an array from the result.
         * The values of the array can be customized by providing a `valueSelector` function.
         * Defaults to the element itself.
         * @param selector CSS selector to match.
         */
        queryAsArray<T = Element>(selector: string, valueSelector?: (element: Element) => T): T[];
        /**
         * Query all element descendants of node that match selectors, then create a `Set` from the result.
         * The values of the set can be customized by providing a `valueSelector` function.
         * Defaults to the element itself.
         * @param selector CSS selector to match.
         */
        queryAsSet<T = Element>(selector: string, valueSelector?: (element: Element) => T): Set<T>;
        /**
         * Returns all element descendants of node that match selectors.
         * However, unlike `querySelectorAll`, this method returns a `Map` instead of a `NodeList`.
         * 
         * The keys of the map are determined by the `keySelector` function that must be provided.
         * The values can also be customized by providing a `valueSelector` function, but defaults to the element itself.
         * @param selector CSS selector to match.
         * @param keySelector Function that returns the key for each element.
         * @param valueSelector Function that returns the value for each element.
         */
        queryAsMap<T extends Element, K, V = T>(
            selector: string,
            keySelector: (element: T) => K,
            valueSelector?: (element: T) => V
        ): Map<K, V>;
    }

    interface MapConstructor {
        /**
         * Creates a new map from the provided elements.
         * @param source Elements to create the map from. If this is a string, it will be treated as a CSS selector.
         * @param keySelector Function that returns the key for each element.
         * @param valueSelector Function that returns the value for each element.
         */
        fromElements<T extends Element[] | NodeList | string, K, V>(
            source: T,
            keySelector: (element: Element) => K,
            valueSelector: (element: Element) => V
        ): Map<K, V>;
    }

    interface SetConstructor {
        /**
         * Creates a new set from the provided elements.
         * @param source Elements to create the set from. If this is a string, it will be treated as a CSS selector.
         * @param valueSelector Function that returns the value for each element.
         **/
        fromElements<T extends Element[] | NodeList | string, K>(source: T, valueSelector: (element: Element) => K): Set<K>;
    }
}

Document.prototype.queryStrict = function<T extends Element>(selector: string): T {
    const element = this.querySelector<T>(selector);
    if (!element) throw new Error(`No element found for selector "${selector}"`);
    return element;
};

Document.prototype.queryAsArray = function<T = Element>(selector: string, valueSelector?: (element: Element) => T): T[] {
    if (!valueSelector) valueSelector = (element: Element) => element as T;
    const elements = this.querySelectorAll(selector);
    return Array.from(elements, valueSelector);
};

Document.prototype.queryAsSet = function<T = Element>(selector: string, valueSelector?: (element: Element) => T): Set<T> {
    if (!valueSelector) valueSelector = (element: Element) => element as T;
    const elements = this.queryAsArray<T>(selector, valueSelector);
    return new Set(elements);
};

Document.prototype.queryAsMap = function<T extends Element, K, V = T>(
    selector: string,
    keySelector: (element: T) => K,
    valueSelector: (element: T) => V = (el: T) => (el as unknown) as V
): Map<K, V> {
    const elements = this.queryAsArray<T>(selector);
    const map = new Map<K, V>();
    for (const element of elements) {
        const key = keySelector(element);
        const value = valueSelector(element);
        map.set(key, value);
    };

    return map;
};

Element.prototype.getAttributeStrict = function<T extends string>(attribute: string): T {
    const value = this.getAttribute(attribute)?.trim();
    if (typeof value !== 'string' || value.length === 0) throw new Error(`attribute "${attribute}" not found`);
    return value as T;
};

Element.prototype.getAttributeAsFloatStrict = function(attribute: string): number {
    const value = this.getAttributeStrict(attribute);
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) throw new Error(`could not parse attribute "${attribute}" as float`);
    return parsed;
};

Element.prototype.getAttributeAsIntStrict = function(attribute: string, radix: number = 10): number {
    const value = this.getAttributeStrict(attribute);
    const parsed = Number.parseInt(value.replace(/\D/g, ''), radix);
    if (!Number.isInteger(parsed)) throw new Error(`could not parse attribute "${attribute}" as integer`);
    return parsed;
};

Element.prototype.getTextContentStrict = function<T extends string>(): T {
    const content = this.textContent?.trim();
    if (typeof content !== 'string' || content.length === 0) throw new Error('element has no text content');
    return content as T;
};

Element.prototype.parseIntStrict = function(radix: number = 10): number {
    const content = this.textContent?.trim();
    if (typeof content !== 'string' || content.length === 0) throw new Error('element has no text content');

    const parsed = Number.parseInt(content.replace(/\D/g, ''), radix);
    if (!Number.isInteger(parsed)) throw new Error('could not parse text content as integer');
    return parsed;
};

Element.prototype.parseFloatStrict = function(): number {
    const content = this.textContent?.trim();
    if (typeof content !== 'string' || content.length === 0) throw new Error('element has no text content');

    const parsed = Number.parseFloat(content);
    if (!Number.isFinite(parsed)) throw new Error('could not parse text content as float');
    return parsed;
};

Element.prototype.queryStrict = function<T extends Element>(selector: string): T {
    const element = this.querySelector<T>(selector);
    if (!element) throw new Error(`No element found for selector "${selector}"`);
    return element;
};

Element.prototype.queryAsArray = function<T = Element>(selector: string, valueSelector?: (element: Element) => T): T[] {
    if (!valueSelector) valueSelector = (element: Element) => element as T;
    const elements = this.querySelectorAll(selector);
    return Array.from(elements, valueSelector);
};

Element.prototype.queryAsSet = function<T = Element>(selector: string, valueSelector?: (element: Element) => T): Set<T> {
    if (!valueSelector) valueSelector = (element: Element) => element as T;
    const elements = this.queryAsArray<T>(selector, valueSelector);
    return new Set(elements);
};

Element.prototype.queryAsMap =  function<T extends Element, K, V = T>(
    selector: string,
    keySelector: (element: T) => K,
    valueSelector: (element: T) => V = (el: T) => (el as unknown) as V
): Map<K, V> {
    const elements = this.queryAsArray<T>(selector);
    const map = new Map<K, V>();
    for (const element of elements) {
        const key = keySelector(element);
        const value = valueSelector(element);
        map.set(key, value);
    };

    return map;
};

// Métodos estáticos.
Array.fromElements = function<T extends Element[] | NodeList | string, V>(
    source: T,
    valueSelector: (element: Element) => V
): V[] {
    isValidElementSource(source);
    const elements = parseElementSource(source);
    return Array.from(elements, valueSelector);
};

Map.fromElements = function<T extends Element[] | NodeList | string, K, V>(
    source: T,
    keySelector: (element: Element) => K,
    valueSelector: (element: Element) => V
): Map<K, V> {
    isValidElementSource(source);
    const elements = parseElementSource(source);
    const map = new Map<K, V>();
    for (const element of elements) {
        if (!(element instanceof Element)) throw new Error('item in source array is not an element');
        const key = keySelector(element);
        const value = valueSelector(element);
        map.set(key, value);
    }
    return map;
};

Set.fromElements = function<T extends Element[] | NodeList | string, K>(
    source: T,
    valueSelector: (element: Element) => K
): Set<K> {
    isValidElementSource(source);
    const elements = parseElementSource(source);
    const set = new Set<K>();
    for (const element of elements) {
        if (!(element instanceof Element)) throw new Error('item in source array is not an element');
        const value = valueSelector(element);
        set.add(value);
    }
    return set;
};

// Auxiliares.
function isValidElementSource<T>(source: unknown): source is T[] | NodeList | string {
    if (
        !Array.isArray(source) &&
        !(source instanceof NodeList) &&
        (typeof source !== 'string' || source.length === 0)
    ) {
        throw new TypeError('source must be an array, a NodeList or a string');
    };

    return true;
};

function parseElementSource<T extends Element[] | NodeList | string>(source: T): Element[] {
    if (typeof source === 'string') {
        return document.queryAsArray(source);
    } else if (Array.isArray(source)) {
        return source;
    } else if (source instanceof NodeList) {
        return Array.from(source) as Element[];
    } else {
        throw new TypeError('source must be an array, a NodeList or a string');
    };
};