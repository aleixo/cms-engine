"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeCard = exports.formatValue = void 0;
var _creditCardType = _interopRequireDefault(require("credit-card-type"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const getTypeCard = (value, availableOptions) => {
  const rawValue = removeGaps(value.toString());
  const types = (0, _creditCardType.default)(rawValue);
  const selected = (availableOptions === null || availableOptions === void 0 ? void 0 : availableOptions.length) ? types === null || types === void 0 ? void 0 : types.filter(({
    type: id1
  }) => availableOptions.some(id2 => id2 === id1))[0] : types[0];
  return [selected, rawValue];
};
exports.getTypeCard = getTypeCard;
const removeGaps = value => value === null || value === void 0 ? void 0 : value.replace(/ /g, '');
const addGaps = (value, gaps = []) => {
  const [regexString, replaceString] = gaps.reduce(([regexString, replaceString], offset, i) => {
    const lastOffset = gaps[i - 1] || 0;
    const digitNumber = offset - lastOffset;
    return [`${regexString}([0-9]{0,${digitNumber}})`, `${replaceString}$${i + 1} `];
  }, ['', '']);
  return value.replace(new RegExp(regexString), replaceString).trim();
};
const formatValue = (value, type) => {
  const DEFAULT_LENGTH = 19;
  return type ? addGaps(value.slice(0, type === null || type === void 0 ? void 0 : type.lengths[0]), type.gaps) : value.slice(0, DEFAULT_LENGTH);
};
exports.formatValue = formatValue;