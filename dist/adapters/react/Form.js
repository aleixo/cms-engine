"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../core/index.js");
var _constants = require("../../core/constants.js");
var _Field = _interopRequireDefault(require("./Field.js"));
var _Submit = _interopRequireDefault(require("./Submit.js"));
var _context = require("./context.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
const Form = /*#__PURE__*/_react.default.forwardRef(({
  autoComplete,
  hooks,
  iVars,
  id = _constants.DEFAULT_FORM_ID,
  schema = {
    components: []
  },
  submitOnValidOnly = true,
  initialValues = {},
  className,
  onData,
  onSubmit,
  onBlur,
  onFormMount,
  onFieldMount,
  onStep,
  onFocus,
  onLog,
  onScopeChange,
  onFormRehydrate,
  onFieldRehydrate,
  renderFieldWrapper
}, ref) => {
  var _a;
  const [, forceUpdate] = (0, _react.useReducer)(x => x + 1, 0);
  const formRef = (0, _react.useRef)(null);
  const submitRef = (0, _react.useRef)(null);
  const {
    mapper: Mapper,
    propsMapping: PropsMapping
  } = (0, _react.useContext)(_context.FormContext);
  const formInstance = (0, _react.useMemo)(() => {
    const formInstance = (0, _index.getFormInstance)(id, {
      schema,
      newInstance: true,
      initialScope: {
        configs: Object.assign(Object.assign({}, schema === null || schema === void 0 ? void 0 : schema.configs), {
          enableLogging: !!onLog
        }),
        global: Object.assign(Object.assign({}, schema === null || schema === void 0 ? void 0 : schema.iVars), iVars)
      },
      initialValues
    });
    (hooks === null || hooks === void 0 ? void 0 : hooks.preMount) && formInstance.subscribe("ON_FORM_MOUNT" /* EEVents.ON_FORM_MOUNT */, hooks === null || hooks === void 0 ? void 0 : hooks.preMount);
    formInstance.publish("ON_FORM_MOUNT" /* EEVents.ON_FORM_MOUNT */);
    return formInstance;
  }, []);
  const StepWrapper = (0, _react.useMemo)(() => Mapper.step ? Mapper.step.component : _react.default.Fragment, []);
  const Children = (0, _react.useMemo)(() => {
    if (!formInstance.step.currentStepSchema) {
      return undefined;
    }
    const generateComponentChildren = (component, componentLevel = 0) => {
      var _a;
      return (_a = component.children) === null || _a === void 0 ? void 0 : _a.map((component, i) => {
        var _a;
        const Component = (_a = Mapper[component.component]) === null || _a === void 0 ? void 0 : _a.component;
        return /*#__PURE__*/_react.default.createElement(_Field.default, {
          key: `${formInstance.step.index}_${componentLevel}_${component.name}_${component.component}_${i}`,
          component: component,
          wrapper: Component,
          propsMapping: PropsMapping[component.component],
          formId: id,
          onMount: data => {
            onFieldMount && onFieldMount(formInstance.formData, component, data);
          },
          customWrapper: renderFieldWrapper,
          onRehydrate: data => {
            onFieldRehydrate && onFieldRehydrate(formInstance.formData, component, data);
          },
          onChange: data => {
            onData && onData(formInstance.formData, component, data);
          },
          onBlur: data => {
            onBlur && onBlur(formInstance.formData, component, data);
          },
          onFocus: data => {
            onFocus && onFocus(formInstance.formData, component, data);
          }
        }, Array.isArray(component.children) ? generateComponentChildren(component, componentLevel + 1) : component.children);
      });
    };
    return generateComponentChildren(formInstance.step.currentStepSchema);
  }, [formInstance.step.index, id]);
  (0, _react.useEffect)(() => {
    onFormMount && onFormMount(formInstance.formData);
  }, []);
  (0, _react.useEffect)(() => {
    formInstance.scope.globalScope = {
      namespace: 'global',
      data: Object.assign(Object.assign({}, schema === null || schema === void 0 ? void 0 : schema.iVars), iVars)
    };
  }, [JSON.stringify(iVars)]);
  (0, _react.useMemo)(() => formInstance.subscribe("ON_FORM_REHYDRATE" /* EEVents.ON_FORM_REHYDRATE */, () => onFormRehydrate && onFormRehydrate(formInstance.formData)), []);
  (0, _react.useEffect)(() => formInstance.subscribe("ON_FORM_REHYDRATE" /* EEVents.ON_FORM_REHYDRATE */, forceUpdate), []);
  (0, _react.useEffect)(() => formInstance.subscribe("LOG" /* EEVents.LOG */, ({
    data
  }) => onLog && onLog(data)), []);
  (0, _react.useMemo)(() => formInstance.subscribe((0, _index.ALL_NAMESPACE_EVENTS)("ON_SCOPE_CHANGE" /* EEVents.ON_SCOPE_CHANGE */), data => onScopeChange && onScopeChange(formInstance.scope.scope, data.data.namespace, data.data.key)), []);
  (0, _react.useEffect)(() => formInstance.subscribe("ON_FORM_SUBMIT" /* EEVents.ON_FORM_SUBMIT */, ({
    data
  }) => {
    const hookResult = (hooks === null || hooks === void 0 ? void 0 : hooks.preSubmit) && (hooks === null || hooks === void 0 ? void 0 : hooks.preSubmit(formInstance.formData));
    if (!formInstance.formData.form.isValid && submitOnValidOnly) return;
    onSubmit && onSubmit(data.event, Object.assign(Object.assign({}, formInstance.formData), {
      formatted: Object.assign(Object.assign({}, formInstance.formData.formatted), hookResult)
    }));
  }), []);
  (0, _react.useEffect)(() => formInstance.subscribeBulk([_index.CoreEvents.NAVIGATE_STEP_BACK, _index.CoreEvents.NAVIGATE_STEP_FORWARD], () => {
    onStep && onStep(formInstance.formData);
    forceUpdate();
  }), []);
  (0, _react.useImperativeHandle)(ref, () => ({
    values: () => formInstance.formData,
    stepForward: formInstance.publishFor(_index.CoreEvents.NAVIGATE_STEP_FORWARD),
    stepBack: formInstance.publishFor(_index.CoreEvents.NAVIGATE_STEP_BACK),
    validateForm: formInstance.publishFor(_index.CoreEvents.VALIDATE_FORM),
    submit: () => {
      var _a;
      return (_a = submitRef.current) === null || _a === void 0 ? void 0 : _a.click();
    },
    schema
  }), []);
  return /*#__PURE__*/_react.default.createElement("form", {
    className: className,
    ref: formRef,
    autoComplete: autoComplete,
    onSubmit: event => {
      event.preventDefault();
      formInstance.publish(_index.CoreEvents.ON_FORM_SUBMIT, {
        event
      });
    }
  }, /*#__PURE__*/_react.default.createElement(StepWrapper, Object.assign({}, (_a = formInstance.step.currentStepSchema) === null || _a === void 0 ? void 0 : _a.props), Children), /*#__PURE__*/_react.default.createElement(_Submit.default, {
    ref: submitRef
  }));
});
//If we do not have schema present loading component if defined and render only when we have schema
const SchemaGuard = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  if (!props.schema) return props.renderLoading ? props.renderLoading() : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  return /*#__PURE__*/_react.default.createElement(Form, Object.assign({}, props, {
    ref: ref
  }));
});
var _default = SchemaGuard;
exports.default = _default;