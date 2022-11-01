"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var Events = _interopRequireWildcard(require("../../events/index.js"));
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
  event
}) => {
  var _a;
  const mapperNextStepIndex = {
    [Events.CoreEvents.NAVIGATE_STEP_BACK]: form.step.index - 1,
    [Events.CoreEvents.NAVIGATE_STEP_FORWARD]: form.step.index + 1
  };
  const nextStepIndex = mapperNextStepIndex[event];
  if (!((_a = form.schema) === null || _a === void 0 ? void 0 : _a.components[mapperNextStepIndex[event]])) {
    form.step = Object.assign(Object.assign({}, form.step), {
      navigated: false
    });
    return;
  }
  const nextStep = form.schema.components[nextStepIndex];
  form.step = Object.assign(Object.assign({}, form.step), {
    numSteps: form.schema.components.length,
    navigated: !!form.schema.components[nextStepIndex],
    index: !!form.schema.components[nextStepIndex] ? nextStepIndex : form.step.index,
    currentStepSchema: !!form.schema.components[nextStepIndex] ? nextStep : form.step.currentStepSchema
  });
};
exports.handler = handler;