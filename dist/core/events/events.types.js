"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EFlowLogging = exports.CoreEvents = void 0;
const CoreEvents = {
  ON_FIELD_MOUNT: 'ON_FIELD_MOUNT',
  ON_FIELD_CHANGE: 'ON_FIELD_CHANGE',
  ON_FIELD_BLUR: 'ON_FIELD_BLUR',
  ON_FIELD_FOCUS: 'ON_FIELD_FOCUS',
  ON_FIELD_REHYDRATE: 'ON_FIELD_REHYDRATE',
  RUN_FIELD_VALIDATIONS: 'RUN_FIELD_VALIDATIONS',
  RUN_FIELD_FORMATTERS: 'RUN_FIELD_FORMATTERS',
  RUN_FIELD_MASKS: 'RUN_FIELD_MASKS',
  ON_SCOPE_CHANGE: 'ON_SCOPE_CHANGE',
  ON_FORM_SUBMIT: 'ON_FORM_SUBMIT',
  ON_FORM_MOUNT: 'ON_FORM_MOUNT',
  ON_FORM_UN_MOUNT: 'ON_FORM_UN_MOUNT',
  ON_FORM_REHYDRATE: 'ON_FORM_REHYDRATE',
  NAVIGATE_STEP_FORWARD: 'NAVIGATE_STEP_FORWARD',
  NAVIGATE_STEP_BACK: 'NAVIGATE_STEP_BACK',
  VALIDATE_FORM: 'VALIDATE_FORM',
  LOG: 'LOG'
};
exports.CoreEvents = CoreEvents;
var EFlowLogging;
exports.EFlowLogging = EFlowLogging;
(function (EFlowLogging) {
  EFlowLogging["OBSERVER"] = "OBSERVER";
  EFlowLogging["REACT_FIELD_ADAPTER"] = "REACT FIELD ADAPTER";
  EFlowLogging["FIELD_HANDLER"] = "FIELD HANDLER";
})(EFlowLogging || (exports.EFlowLogging = EFlowLogging = {}));