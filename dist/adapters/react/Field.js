"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../core/index.js");
var _eventsTypes = require("../../core/events/events.types.js");
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
const Field = ({
  children,
  component,
  wrapper,
  propsMapping = {},
  formId,
  onMount,
  onChange,
  onFocus,
  onBlur,
  onRehydrate,
  customWrapper
}) => {
  const [forceChange, dispatchForceChange] = (0, _useForceUpdate.useForceUpdate)();
  const [forceRehydrate, dispatchForceRehydrate] = (0, _useForceUpdate.useForceUpdate)();
  const [forceBlur, dispatchForceBlur] = (0, _useForceUpdate.useForceUpdate)();
  const [forceFocus, dispatchForceFocus] = (0, _useForceUpdate.useForceUpdate)();
  const fieldInstance = (0, _react.useMemo)(() => (0, _index.getFormInstance)(formId).getFieldInstance(component, propsMapping), []);
  const Element = (0, _react.useMemo)(() => wrapper, [wrapper]);
  (0, _react.useMemo)(() => {
    fieldInstance.publish((0, _index.BUILD_EVENT)("ON_FIELD_MOUNT" /* EEVents.ON_FIELD_MOUNT */, component.name));
    onMount && onMount(fieldInstance.data);
  }, []);
  // Effects to make the Field -> Form callback flow synchronous
  (0, _react.useEffect)(() => {
    if (!forceRehydrate) return;
    onRehydrate(fieldInstance.data);
  }, [forceRehydrate]);
  (0, _react.useEffect)(() => {
    if (!forceChange) return;
    onChange(fieldInstance.data);
  }, [forceChange]);
  (0, _react.useEffect)(() => {
    if (!forceBlur) return;
    onBlur(fieldInstance.data);
  }, [forceBlur]);
  (0, _react.useEffect)(() => {
    if (!forceFocus) return;
    onFocus(fieldInstance.data);
  }, [forceFocus]);
  //Effects to listen to form Events
  (0, _react.useEffect)(() => fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_REHYDRATE" /* EEVents.ON_FIELD_REHYDRATE */, component.name), () => dispatchForceRehydrate()), []);
  (0, _react.useEffect)(() => fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_BLUR" /* EEVents.ON_FIELD_BLUR */, component.name), () => dispatchForceBlur()), []);
  (0, _react.useEffect)(() => fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_CHANGE" /* EEVents.ON_FIELD_CHANGE */, component.name), () => dispatchForceChange()), []);
  (0, _react.useEffect)(() => fieldInstance.subscribe((0, _index.BUILD_EVENT)("ON_FIELD_FOCUS" /* EEVents.ON_FIELD_FOCUS */, component.name), () => dispatchForceFocus()), []);
  fieldInstance.logInfo(_eventsTypes.EFlowLogging.REACT_FIELD_ADAPTER, '', 'render', {
    component
  });
  if (!fieldInstance.data.visible || !fieldInstance.data.mounted) {
    return null;
  }
  if (customWrapper) {
    return customWrapper(component, Object.assign({}, fieldInstance.data), /*#__PURE__*/_react.default.createElement(Element, Object.assign({}, fieldInstance.props), children));
  }
  return /*#__PURE__*/_react.default.createElement(Element, Object.assign({}, fieldInstance.props), children);
};
var _default = Field;
exports.default = _default;