"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForceUpdate = void 0;
var _react = require("react");
const useForceUpdate = () => {
  const [value, setValue] = (0, _react.useState)(0); // integer state
  return [value, () => setValue(value => value + 1)];
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
};

exports.useForceUpdate = useForceUpdate;