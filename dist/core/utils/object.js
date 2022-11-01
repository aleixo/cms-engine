"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueByPath = exports.encapsulateIn = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
const encapsulateIn = (origin, path, value) => {
  return _lodash.default.set(origin, path, value);
};
exports.encapsulateIn = encapsulateIn;
const getValueByPath = (object = {}, path = '') => {
  return _lodash.default.get(object, path);
};
exports.getValueByPath = getValueByPath;