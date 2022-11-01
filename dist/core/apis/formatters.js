"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;
var utils = _interopRequireWildcard(require("../utils/index.js"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const splitter = ({
  value,
  formatterValue
}) => {
  if (!value) return value;
  let formattedValue = undo_splitter({
    value,
    formatterValue
  });
  formatterValue.forEach(formatter => {
    if (formatter.position >= value.length) {
      return;
    }
    formattedValue = formattedValue.slice(0, formatter.position) + formatter.value + formattedValue.slice(formatter.position, formattedValue === null || formattedValue === void 0 ? void 0 : formattedValue.length);
  });
  return formattedValue;
};
const undo_splitter = ({
  value,
  formatterValue
}) => {
  if (!value) return value;
  let originalValue = '';
  let formattersApplied = 0;
  formatterValue.forEach((formatter, i) => {
    const nextStartingIndex = i === 0 ? i : formatterValue[i - 1].position + 1;
    if (value[formatter.position] == formatter.value) {
      formattersApplied++;
    }
    originalValue += value.slice(nextStartingIndex, formatter.position);
  });
  originalValue += value.slice(originalValue.length + formattersApplied);
  return originalValue;
};
const capitalize = ({
  value
}) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};
const gapsCreditCard = ({
  value,
  formatterValue
}) => {
  if (!value) return;
  const [type, rawValue] = utils.creditCard.getTypeCard(value, formatterValue);
  return utils.creditCard.formatValue(rawValue, type);
};
const formatters = {
  splitter,
  undo_splitter,
  capitalize,
  gapsCreditCard
};
const run = (value, componentFormatters, undo) => {
  let newValue = value;
  Object.keys(componentFormatters).forEach(key => {
    const formatterValue = componentFormatters[key];
    const formatterFn = formatters[undo ? `undo_${key}` : key];
    if (!formatterFn) return;
    newValue = formatterFn({
      value: newValue,
      formatterValue
    });
  });
  return newValue;
};
exports.run = run;