"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.formFlows = exports.fieldFlows = void 0;
var Events = _interopRequireWildcard(require("../events/index.js"));
var change = _interopRequireWildcard(require("./field/change.js"));
var mount = _interopRequireWildcard(require("./field/mount.js"));
var blur = _interopRequireWildcard(require("./field/blur.js"));
var focus = _interopRequireWildcard(require("./field/focus.js"));
var templating = _interopRequireWildcard(require("./field/templating.js"));
var api = _interopRequireWildcard(require("./field/api.js"));
var data = _interopRequireWildcard(require("./field/data.js"));
var clearFields = _interopRequireWildcard(require("./field/clearFields.js"));
var rehydrate = _interopRequireWildcard(require("./field/rehydrate.js"));
var visibilityConditions = _interopRequireWildcard(require("./field/visibilityConditions.js"));
var htmlEventParser = _interopRequireWildcard(require("./field/htmlEventParser.js"));
var formatters = _interopRequireWildcard(require("./field/formatters.js"));
var filter = _interopRequireWildcard(require("./field/filter.js"));
var masks = _interopRequireWildcard(require("./field/masks.js"));
var validations = _interopRequireWildcard(require("./field/validations.js"));
var hooks = _interopRequireWildcard(require("./form/hooks.js"));
var steps = _interopRequireWildcard(require("./form/steps.js"));
var validate = _interopRequireWildcard(require("./form/validate.js"));
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
//Field handlers

//Form handlers

const register = (observer, flows, component) => {
  const flow = flows();
  Object.keys(flow).forEach(event => {
    flow[event].forEach(handler => {
      if (handler.events) {
        const events = handler.events(component);
        if (Array.isArray(events) && !events.includes(event)) return;
      }
      observer.subscribe(Events.BUILD_EVENT(event, component === null || component === void 0 ? void 0 : component.name), handler.handler);
    });
  });
};
exports.register = register;
const fieldFlows = () => ({
  ["ON_FIELD_MOUNT" /* EEVents.ON_FIELD_MOUNT */]: [mount, templating, api, validations, formatters, visibilityConditions, clearFields, rehydrate, templating, masks, data],
  ["ON_FIELD_CHANGE" /* EEVents.ON_FIELD_CHANGE */]: [htmlEventParser, filter, change, validations, formatters, api, visibilityConditions, clearFields, rehydrate, templating, data, masks],
  ["ON_FIELD_BLUR" /* EEVents.ON_FIELD_BLUR */]: [blur, formatters, masks, validations, templating, api, visibilityConditions, clearFields, data],
  ["ON_FIELD_FOCUS" /* EEVents.ON_FIELD_FOCUS */]: [focus, masks]
});
exports.fieldFlows = fieldFlows;
const formFlows = () => ({
  ["ON_FORM_MOUNT" /* EEVents.ON_FORM_MOUNT */]: [hooks, steps, validate],
  ["VALIDATE_FORM" /* EEVents.VALIDATE_FORM */]: [validate],
  ["ON_FORM_SUBMIT" /* EEVents.ON_FORM_SUBMIT */]: [hooks],
  ["ON_FORM_UN_MOUNT" /* EEVents.ON_FORM_UN_MOUNT */]: [hooks],
  ["NAVIGATE_STEP_BACK" /* EEVents.NAVIGATE_STEP_BACK */]: [steps],
  ["NAVIGATE_STEP_FORWARD" /* EEVents.NAVIGATE_STEP_FORWARD */]: [steps],
  ["ON_FORM_REHYDRATE" /* EEVents.ON_FORM_REHYDRATE */]: []
});
exports.formFlows = formFlows;