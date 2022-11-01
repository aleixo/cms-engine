import lodash from 'lodash';

/**
 * Encapsulates in a given object, at a given path the provided value
 *
 * @example
 * ORIGINAL object
 *
 * encapsulateIn({maintain: 'spread_me'}, 'a.b.c','test')
 *
 * RESULT
 *
 * {
 *  maintain: 'spread_me',
 *    c: 'test
 *  }
 * }
 *
 * @param origin - The original object where the new value will be appended
 * @param path - The path at which the new value will be placed
 * @param value - The new value
 * @returns One new object with the new value at the provided path merged with the given object
 */
const encapsulateIn = (origin: Record<string, unknown>, path: string, value: string): Record<string, unknown> => {
  return lodash.set(origin, path, value);
};

const getValueByPath = (
  object: Record<string, any> = {},
  path = '',
): string | number | boolean | Record<string, unknown> => {
  return lodash.get(object, path);
};

export { encapsulateIn, getValueByPath };
