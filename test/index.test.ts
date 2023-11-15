import '../src/index';
import { expect, test } from 'vitest';

test('Document.prototype.queryStrict', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);
    expect(document.queryStrict('#test')).toBe(div);

    div.remove();
    expect(() => document.queryStrict('#test')).toThrow();
});

test('Document.prototype.queryAsArray', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = document.queryAsArray('#test');
    expect(result).toEqual([div]);

    const result2 = document.queryAsArray('#test', (el) => el.id);
    expect(result2).toEqual(['test']);

    div.remove();
    expect(document.queryAsArray('#test')).toEqual([]);
});

test('Document.prototype.queryAsSet', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = document.queryAsSet('#test');
    expect(result.has(div)).toBe(true);

    const result2 = document.queryAsSet('#test', (el) => el.id);
    expect(result2.has('test')).toBe(true);

    div.remove();
    expect(document.queryAsSet('#test').size).toBe(0);
});

test('Document.prototype.queryAsMap', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = document.queryAsMap('#test', (el) => el.id);
    expect(result.get('test')).toBe(div);

    const result2 = document.queryAsMap(
        '#test',
        (el) => el,
        (el) => el.id
    );
    expect(result2.get(div)).toBe('test');

    div.remove();
    const result3 = document.queryAsMap('#test', (el) => el.id);
    expect(result3.size).toBe(0);
});

test('Element.prototype.getAttributeStrict', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    expect(div.getAttributeStrict('id')).toBe('test');
    expect(() => div.getAttributeStrict('class')).toThrow();
});

test('Element.prototype.getAttributeAsFloatStrict', () => {
    const div = document.createElement('div');
    div.setAttribute('value', '1.2');
    div.setAttribute('other-value', 'test');
    expect(div.getAttributeAsFloatStrict('value')).toBe(1.2);
    expect(() => div.getAttributeAsFloatStrict('other-value')).toThrow();
});

test('Element.prototype.getAttributeAsIntStrict', () => {
    const div = document.createElement('div');
    div.setAttribute('value', '1');
    div.setAttribute('other-value', 'test');
    expect(div.getAttributeAsIntStrict('value')).toBe(1);
    expect(() => div.getAttributeAsIntStrict('other-value')).toThrow();
});

test('Element.prototype.getTextContentStrict', () => {
    const div = document.createElement('div');
    div.textContent = 'test';
    expect(div.getTextContentStrict()).toBe('test');

    div.textContent = '   test2   ';
    expect(div.getTextContentStrict()).toBe('test2');

    div.textContent = '';
    expect(() => div.getTextContentStrict()).toThrow();

    div.textContent = null;
    expect(() => div.getTextContentStrict()).toThrow();
});

test('Element.prototype.parseIntStrict', () => {
    const div = document.createElement('div');
    div.textContent = '1';
    expect(div.parseIntStrict()).toBe(1);

    div.textContent = 'test';
    expect(() => div.parseIntStrict()).toThrow();

    div.textContent = null;
    expect(() => div.parseIntStrict()).toThrow();
});

test('Element.prototype.parseFloatStrict', () => {
    const div = document.createElement('div');
    div.textContent = '1';
    expect(div.parseFloatStrict()).toBe(1);

    div.textContent = '1.2';
    expect(div.parseFloatStrict()).toBe(1.2);

    div.textContent = 'test';
    expect(() => div.parseFloatStrict()).toThrow();

    div.textContent = null;
    expect(() => div.parseFloatStrict()).toThrow();
});

test('Element.prototype.queryStrict', () => {
    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    wrapper.appendChild(div);

    expect(wrapper.queryStrict('#test')).toBe(div);
    expect(() => wrapper.queryStrict('#test2')).toThrow();
});

test('Element.prototype.queryAsArray', () => {
    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    wrapper.appendChild(div);

    const result = wrapper.queryAsArray('#test');
    expect(result).toEqual([div]);

    const result2 = wrapper.queryAsArray('#test', (el) => el.id);
    expect(result2).toEqual(['test']);

    expect(wrapper.queryAsArray('#test2')).toEqual([]);
});

test('Element.prototype.queryAsSet', () => {
    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    wrapper.appendChild(div);

    const result = wrapper.queryAsSet('#test');
    expect(result.has(div)).toBe(true);

    const result2 = wrapper.queryAsSet('#test', (el) => el.id);
    expect(result2.has('test')).toBe(true);

    expect(wrapper.queryAsSet('#test2').size).toBe(0);
});

test('Element.prototype.queryAsMap', () => {
    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    wrapper.appendChild(div);

    const result = wrapper.queryAsMap('#test', (el) => el.id);
    expect(result.get('test')).toBe(div);

    const result2 = wrapper.queryAsMap(
        '#test',
        (el) => el,
        (el) => el.id
    );
    expect(result2.get(div)).toBe('test');

    expect(wrapper.queryAsMap('#test2', (el) => el.id).size).toBe(0);
});

test('URLSearchParams.prototype.getStrict', () => {
    const params = new URLSearchParams();
    params.append('test', 'test');
    expect(params.getStrict('test')).toBe('test');
    expect(() => params.getStrict('test2')).toThrow();
});

test('URLSearchParams.prototype.getAsInteger', () => {
    const params = new URLSearchParams();
    params.append('test', '1');
    params.append('test2', 'test');
    expect(params.getAsInteger('test')).toBe(1);
    expect(params.getAsInteger('test2')).toBeNaN();
    expect(params.getAsInteger('test3')).toBeNull();
});

test('URLSearchParams.prototype.getAsIntegerStrict', () => {
    const params = new URLSearchParams();
    params.append('test', '1');
    params.append('test2', 'test');
    expect(params.getAsIntegerStrict('test')).toBe(1);
    expect(() => params.getAsIntegerStrict('test2')).toThrow();
    expect(() => params.getAsIntegerStrict('test3')).toThrow();
});

test('Array.fromElements', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = Array.fromElements('#test', (el) => el);
    expect(result).toEqual([div]);

    const nodeList = document.querySelectorAll('#test');
    const result2 = Array.fromElements(nodeList, (el) => el);
    expect(result2).toEqual([div]);
});

test('Map.fromElements', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = Map.fromElements(
        '#test',
        (el) => el.id,
        (el) => el
    );
    expect(result.get('test')).toBe(div);

    const nodeList = document.querySelectorAll('#test');
    const result2 = Map.fromElements(
        nodeList,
        (el) => el.id,
        (el) => el
    );
    expect(result2.get('test')).toBe(div);
});

test('Set.fromElements', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'test');
    document.body.appendChild(div);

    const result = Set.fromElements('#test', (el) => el);
    expect(result.has(div)).toBe(true);

    const nodeList = document.querySelectorAll('#test');
    const result2 = Set.fromElements(nodeList, (el) => el);
    expect(result2.has(div)).toBe(true);
});
