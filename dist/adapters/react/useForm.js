"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _index = require("../../core/index.js");
var _constants = require("../../core/constants.js");
const useForm = ({
  onValid,
  onData,
  onSubmit,
  formId = _constants.DEFAULT_FORM_HOOK_ID
}) => {
  const formInstance = (0, _react.useMemo)(() => (0, _index.getFormInstance)(formId), []);
  const formRef = (0, _react.useRef)(null);
  const onDataChange = (0, _react.useCallback)(() => {
    var _a, _b, _c, _d;
    const data = formInstance.formData;
    if (((_a = data.form) === null || _a === void 0 ? void 0 : _a.isValid) !== ((_d = (_c = (_b = formRef === null || formRef === void 0 ? void 0 : formRef.current) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.form) === null || _d === void 0 ? void 0 : _d.isValid)) {
      onValid && onValid(data);
    }
    onData && onData(data);
  }, [onData, onValid]);
  (0, _react.useEffect)(() => formInstance.subscribe((0, _index.ALL_NAMESPACE_EVENTS)("ON_FIELD_CHANGE" /* EEVents.ON_FIELD_CHANGE */), onDataChange), [onData, onValid]);
  (0, _react.useEffect)(() => formInstance.subscribe((0, _index.ALL_NAMESPACE_EVENTS)("ON_FIELD_REHYDRATE" /* EEVents.ON_FIELD_REHYDRATE */), onDataChange), [onData, onValid]);
  (0, _react.useEffect)(() => formInstance.subscribe("ON_FORM_SUBMIT" /* EEVents.ON_FORM_SUBMIT */, () => onSubmit && onSubmit(formInstance.formData)), [onSubmit]);
  const submitForm = () => formInstance.publish("ON_FORM_SUBMIT" /* EEVents.ON_FORM_SUBMIT */);
  const configs = {
    formId: formInstance.formId
  };
  return {
    submitForm,
    formData: () => formInstance.formData,
    configs
  };
};
var _default = useForm;
exports.default = _default;