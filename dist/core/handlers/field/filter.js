"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var apis = _interopRequireWildcard(require("../../apis/index.js"));
var _ObserverError = require("../../events/ObserverError.js");
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
  data,
  eventReducedSchema: {
    formatters
  }
}) => {
  const {
    errorMessages,
    filter
  } = field.scopedComponent;
  if (!filter || !data.parsedEventValue || data.isDeletingValue) return;
  // If field has formatted data lets try to undo it and then apply the filter
  const dataToFilter = formatters ? apis.formatters.run(data.parsedEventValue, formatters, true) || data.parsedEventValue : data.parsedEventValue;
  const error = apis.validations.run(dataToFilter, filter, errorMessages);
  if (field.fieldHasError(error)) {
    throw new _ObserverError.ObserverError(`Filter applied ${JSON.stringify(filter)}`, {
      breaksObservingChain: true
    });
  }
};
exports.handler = handler;