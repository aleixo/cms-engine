"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  field,
  data: {
    event
  }
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  let parsedEventValue = undefined;
  let metadata = undefined;
  //HTML event values here
  const htmlTargetTypesMapper = {
    text: (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value,
    number: parseInt((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value),
    checkbox: ((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.checked) && ((_d = field.scopedComponent.props) === null || _d === void 0 ? void 0 : _d.value) ? (_e = event === null || event === void 0 ? void 0 : event.target) === null || _e === void 0 ? void 0 : _e.value : (_f = event === null || event === void 0 ? void 0 : event.target) === null || _f === void 0 ? void 0 : _f.checked,
    textarea: (_g = event === null || event === void 0 ? void 0 : event.target) === null || _g === void 0 ? void 0 : _g.value,
    'select-one': (_h = event === null || event === void 0 ? void 0 : event.target) === null || _h === void 0 ? void 0 : _h.value
  };
  parsedEventValue = htmlTargetTypesMapper[(_j = event === null || event === void 0 ? void 0 : event.target) === null || _j === void 0 ? void 0 : _j.type];
  if (Array.isArray(event) || typeof event !== 'object' || typeof event === 'string' || typeof event === 'number') {
    parsedEventValue = event;
  }
  if (event === null || event === void 0 ? void 0 : event.id) {
    parsedEventValue = event === null || event === void 0 ? void 0 : event.id;
    metadata = event;
  }
  if (event === null || event === void 0 ? void 0 : event.options) {
    parsedEventValue = event === null || event === void 0 ? void 0 : event.options;
  }
  const isDeletingValue = (parsedEventValue === null || parsedEventValue === void 0 ? void 0 : parsedEventValue.toString().length) < (((_m = (_l = (_k = field.data) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.toString()) === null || _m === void 0 ? void 0 : _m.length) || 0);
  // Here the value is extracted from wherever we want
  return {
    parsedEventValue,
    metadata,
    isDeletingValue
  };
};
exports.handler = handler;