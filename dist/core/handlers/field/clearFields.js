"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.events = void 0;
var apis = _interopRequireWildcard(require("../../apis/index.js"));
var _eventsTypes = require("../../events/events.types.js");
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
  eventReducedSchema
}) => {
  eventReducedSchema === null || eventReducedSchema === void 0 ? void 0 : eventReducedSchema.clearFields.forEach(clearField => {
    clearField.fields.forEach(fieldName => {
      const targetField = form.fields[fieldName];
      if (!clearField.validations) {
        targetField.logInfo(_eventsTypes.EFlowLogging.FIELD_HANDLER, 'rehydrate', 'clearFields', {
          clearField
        });
        targetField.value = clearField.clearedValue;
        targetField.rehydrate();
        return;
      }
      if (!targetField) return;
      const errors = apis.validations.run(targetField.value, clearField.validations);
      if (!targetField.fieldHasError(errors)) return;
      targetField.value = clearField.clearedValue;
      targetField.rehydrate();
      targetField.logInfo(_eventsTypes.EFlowLogging.FIELD_HANDLER, 'rehydrate', 'clearFields', {
        clearField
      });
    });
  });
};
exports.handler = handler;
const events = component => Object.keys(component.clearFields || {});
exports.events = events;