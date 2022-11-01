"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.events = void 0;
var Events = _interopRequireWildcard(require("../../events/index.js"));
var apis = _interopRequireWildcard(require("../../apis/index.js"));
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
  field,
  eventReducedSchema
}) => {
  var _a;
  (_a = eventReducedSchema.visibilityConditions) === null || _a === void 0 ? void 0 : _a.forEach(condition => {
    const fieldNames = [...(condition.fieldNames || [condition.fieldName])];
    fieldNames.forEach(targetFieldName => {
      if (!targetFieldName) return;
      const hasError = field.fieldHasError(apis.validations.run(field.value, condition.validations));
      // IF ITS NOT INITIALIZED, SUBSCRIBE TO ITS MOUNT
      if (!form.fields[targetFieldName]) {
        field.subscribe(Events.BUILD_EVENT("ON_FIELD_MOUNT" /* Events.EEVents.ON_FIELD_MOUNT */, targetFieldName), () => {
          form.fields[targetFieldName].visibility = !hasError;
          form.fields[targetFieldName].rehydrate();
        });
        return;
      }
      form.fields[targetFieldName].visibility = !hasError;
      form.fields[targetFieldName].rehydrate();
    });
  });
};
exports.handler = handler;
const events = component => Object.keys(component.visibilityConditions || {});
exports.events = events;