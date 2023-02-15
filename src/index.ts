import { assert, assertFinite, assertInteger, assertString } from '@tb-dev/ts-guard';
import { assertElement } from '@tb-dev/ts-guard-dom';

declare global {
    interface Document {
        queryAndAssert<T extends Element>(selector: string): T;
        queryAsArray<T extends Element>(selector: string): T[];
        queryAsSet<T extends Element>(selector: string): Set<T>;
        queryAsWeakSet<T extends Element>(selector: string): WeakSet<T>;
        queryAsMap<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): Map<K, T>;
        queryAsWeakMap<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): WeakMap<T, K>;
    }

    interface Element {
        assertAttribute<T extends string>(attribute: string): T;
        assertAttributeAsInt(attribute: string, allowNegative?: boolean, radix?: number): number;
        assertTextContent<T extends string>(): T;
        parseInt(allowNegative?: boolean, radix?: number): number;
        parseFloat(allowNegative?: boolean): number;
        queryAndAssert<T extends Element>(selector: string): T;
        queryAsArray<T extends Element>(selector: string): T[];
        queryAsSet<T extends Element>(selector: string): Set<T>;
        queryAsWeakSet<T extends Element>(selector: string): WeakSet<T>;
        queryAsMap<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): Map<K, T>;
        queryAsWeakMap<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): WeakMap<T, K>;
    }
}

Document.prototype.queryAndAssert = function<T extends Element>(selector: string): T {
    const element = this.querySelector<T>(selector);
    assertElement(element, selector);
    return element;
};

Document.prototype.queryAsArray = function<T extends Element>(selector: string): T[] {
    const elements = this.querySelectorAll<T>(selector);
    return Array.from(elements);
};

Document.prototype.queryAsSet = function<T extends Element>(selector: string): Set<T> {
    return new Set(this.queryAsArray<T>(selector));
};

Document.prototype.queryAsWeakSet = function<T extends Element>(selector: string): WeakSet<T> {
    return new WeakSet(this.queryAsArray<T>(selector));
};

Document.prototype.queryAsMap = function<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): Map<K, T> {
    const elements = this.queryAsArray<T>(selector);
    const map = new Map<K, T>();
    for (const element of elements) {
        const key = keySelector(element);
        map.set(key, element);
    }
    return map;
};

Document.prototype.queryAsWeakMap = function<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): WeakMap<T, K> {
    const elements = this.queryAsArray<T>(selector);
    const map = new WeakMap<T, K>();
    for (const element of elements) {
        const key = keySelector(element);
        map.set(element, key);
    }
    return map;
};

Element.prototype.assertAttribute = function<T extends string>(attribute: string): T {
    const value = this.getAttribute(attribute);
    assertString(value, `O atributo ${attribute} não existe no elemento.`);
    return value.trim() as T;
};

Element.prototype.assertAttributeAsInt = function(attribute: string, allowNegative = false, radix: number = 10): number {
    const value = this.assertAttribute(attribute);
    const parsed = Number.parseInt(value.trim().replace(/\D/g, ''), radix);
    assertInteger(parsed, 'Não foi possível obter um inteiro a partir do atributo.');

    if (allowNegative === false) {
        const sign = Math.sign(parsed);
        assert(sign === 1 || sign === 0, 'O número é negativo.');
    };

    return parsed;
};

Element.prototype.assertTextContent = function<T extends string>(): T {
    const content = this.textContent;
    assertString(content, 'O elemento não possui conteúdo em texto.');
    return content.trim() as T;
};

Element.prototype.parseInt = function(allowNegative = false, radix: number = 10): number {
    const content = this.textContent;
    assertString(content, 'O elemento não possui conteúdo em texto.');
    const parsed = Number.parseInt(content.trim().replace(/\D/g, ''), radix);
    assertInteger(parsed, 'Não foi possível obter um inteiro a partir do conteúdo em texto do elemento.');

    if (allowNegative === false) {
        const sign = Math.sign(parsed);
        assert(sign === 1 || sign === 0, 'O número é negativo.');
    };

    return parsed;
};

Element.prototype.parseFloat = function(allowNegative = false): number {
    const content = this.textContent;
    assertString(content, 'O elemento não possui conteúdo em texto.');
    const parsed = Number.parseFloat(content.trim());
    assertFinite(parsed, 'Não foi possível obter um número de ponto flutuante a partir do conteúdo em texto do elemento.');

    if (allowNegative === false) {
        const sign = Math.sign(parsed);
        assert(sign === 1 || sign === 0, 'O número é negativo.');
    };

    return parsed;
};

Element.prototype.queryAndAssert = function<T extends Element>(selector: string): T {
    const element = this.querySelector<T>(selector);
    assertElement(element, selector);
    return element;
};

Element.prototype.queryAsArray = function<T extends Element>(selector: string): T[] {
    const elements = this.querySelectorAll<T>(selector);
    return Array.from(elements);
};

Element.prototype.queryAsSet = function<T extends Element>(selector: string): Set<T> {
    return new Set(this.queryAsArray<T>(selector));
};

Element.prototype.queryAsWeakSet = function<T extends Element>(selector: string): WeakSet<T> {
    return new WeakSet(this.queryAsArray<T>(selector));
};

Element.prototype.queryAsMap = function<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): Map<K, T> {
    const elements = this.queryAsArray<T>(selector);
    const map = new Map<K, T>();
    for (const element of elements) {
        const key = keySelector(element);
        map.set(key, element);
    }
    return map;
};

Element.prototype.queryAsWeakMap = function<T extends Element, K extends string>(selector: string, keySelector: (element: T) => K): WeakMap<T, K> {
    const elements = this.queryAsArray<T>(selector);
    const map = new WeakMap<T, K>();
    for (const element of elements) {
        const key = keySelector(element);
        map.set(element, key);
    }
    return map;
};