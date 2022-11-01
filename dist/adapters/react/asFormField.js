"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../core/index.js");
var _constants = require("../../core/constants.js");
var _useForceUpdate = require("./useForceUpdate.js");
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
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const asFormField = ({
  Comp,
  propsMapping
}) => _a => {
  var {
      name,
      validations,
      errorMessages,
      masks,
      filter,
      formatters,
      visibilityConditions,
      formId = _constants.DEFAULT_FORM_HOOK_ID,
      visibility = true,
      value
    } = _a,
    props = __rest(_a, ["name", "validations", "errorMessages", "masks", "filter", "formatters", "visibilityConditions", "formId", "visibility", "value"]);
  const [, forceUpdate] = (0, _useForceUpdate.useForceUpdate)();
  const component = (0, _react.useMemo)(() => ({
    state: {
      hidden: !visibility
    },
    component: '',
    name: name,
    validations,
    errorMessages,
    masks,
    filter,
    visibilityConditions,
    formatters
  }), [errorMessages, name, filter, formatters, masks, validations, visibilityConditions]);
  const fieldInstance = (0, _react.useMemo)(() => (0, _index.getFormInstance)(formId).getFieldInstance(component, propsMapping), []);
  (0, _react.useMemo)(() => {
    fieldInstance.subscribeBulk([(0, _index.BUILD_EVENT)("ON_FIELD_MOUNT" /* EEVents.ON_FIELD_MOUNT */, component.name), (0, _index.BUILD_EVENT)("ON_FIELD_REHYDRATE" /* EEVents.ON_FIELD_REHYDRATE */, component.name)], forceUpdate);
  }, []);
  (0, _react.useMemo)(() => {
    fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_CHANGE" /* EEVents.ON_FIELD_CHANGE */, component.name), ({
      data
    }) => {
      forceUpdate();
      props[propsMapping.getValue] && props[propsMapping.getValue](data.event, fieldInstance.data);
    });
  }, [props[propsMapping.getValue]]);
  (0, _react.useMemo)(() => {
    fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_BLUR" /* EEVents.ON_FIELD_BLUR */, component.name), ({
      data
    }) => {
      forceUpdate();
      props[propsMapping.onBlur] && props[propsMapping.onBlur](data.event);
    });
  }, [props[propsMapping.onBlur]]);
  (0, _react.useMemo)(() => {
    fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_FOCUS" /* EEVents.ON_FIELD_FOCUS */, component.name), ({
      data
    }) => {
      forceUpdate();
      props[propsMapping.onFocus] && props[propsMapping.onFocus](data.event);
    });
  }, [props[propsMapping.onFocus]]);
  (0, _react.useEffect)(() => {
    if (typeof value === 'undefined') return;
    fieldInstance.value = value;
    fieldInstance.rehydrate();
  }, [value]);
  (0, _react.useEffect)(() => {
    fieldInstance.visibility = visibility;
    fieldInstance.rehydrate();
  }, [visibility]);
  if (!fieldInstance.data.visible) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }
  return /*#__PURE__*/_react.default.createElement(Comp, Object.assign({}, props, fieldInstance.props));
};
var _default = asFormField;
exports.default = _default;