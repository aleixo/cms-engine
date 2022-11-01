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
  field,
  eventReducedSchema: {
    validations
  }
}) => {
  field.logInfo(_eventsTypes.EFlowLogging.FIELD_HANDLER, '', 'validations');
  if (!validations) {
    return;
  }
  const error = apis.validations.run(field.data.value, validations, field.scopedComponent.errorMessages);
  field.errors = error;
  field.data.failedErrorMessages = field.getFieldErrorMessages(field.data);
};
exports.handler = handler;
const events = component => Object.keys(component.validations || {});
exports.events = events;