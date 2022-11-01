"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var utils = _interopRequireWildcard(require("../../utils/index.js"));
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
const handler = ({
  form,
  field
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  field.data.mounted = true;
  const {
    props = {}
  } = field.component;
  const staticInitialSchemaValue = props[(_a = field.mappings) === null || _a === void 0 ? void 0 : _a.setValue];
  const groupValue = field.component.group && utils.object.getValueByPath(form.initialValues, field.component.group);
  const initialValue = utils.object.getValueByPath(form.initialValues, groupValue === ((_b = field.component.props) === null || _b === void 0 ? void 0 : _b.value) && !!groupValue ? field.component.group : field.component.name) || staticInitialSchemaValue;
  field.value = ((_h = (_d = (_c = form.formData.form) === null || _c === void 0 ? void 0 : _c.steps) === null || _d === void 0 ? void 0 : _d.data[(_g = (_f = (_e = form.formData) === null || _e === void 0 ? void 0 : _e.form) === null || _f === void 0 ? void 0 : _f.steps) === null || _g === void 0 ? void 0 : _g.index]) === null || _h === void 0 ? void 0 : _h.formatted[field.component.name]) || initialValue;
};
exports.handler = handler;