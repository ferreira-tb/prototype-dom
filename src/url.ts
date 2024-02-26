function getStrict() {
  return function (this: URLSearchParams, name: string): string {
    const item = this.get(name);
    if (typeof item !== 'string') {
      throw new TypeError(`key "${name}" not found in URL search parameters`);
    }

    return item;
  };
}

function getAsInteger() {
  return function (this: URLSearchParams, name: string, radix = 10): number | null {
    const item = this.get(name);
    if (typeof item !== 'string') {
      return null;
    }

    return Number.parseInt(item, radix);
  };
}

function getAsIntegerStrict() {
  return function (this: URLSearchParams, name: string, radix = 10): number {
    const value = Number.parseInt(this.getStrict(name), radix);
    if (!Number.isInteger(value)) {
      throw new TypeError(`could not parse "${name}" as an integer`);
    }

    return value;
  };
}

export const urlSearchParams = {
  getStrict,
  getAsInteger,
  getAsIntegerStrict
};
