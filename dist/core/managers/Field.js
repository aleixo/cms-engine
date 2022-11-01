"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var apis = _interopRequireWildcard(require("../apis/index.js"));
var Events = _interopRequireWildcard(require("../events/index.js"));
var _flows = require("../handlers/flows.js");
var _Base = _interopRequireDefault(require("./Base.js"));
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
var __classPrivateFieldSet = void 0 && (void 0).__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Field_fieldData, _Field_component, _Field_scopedComponent, _Field_propsMapping;
class Field extends _Base.default {
  constructor(observer, component, propsMapping, scope) {
    var _a;
    super(observer);
    _Field_fieldData.set(this, void 0);
    _Field_component.set(this, void 0);
    _Field_scopedComponent.set(this, void 0);
    _Field_propsMapping.set(this, void 0);
    this.scopedComponent = component;
    __classPrivateFieldSet(this, _Field_component, component, "f");
    __classPrivateFieldSet(this, _Field_propsMapping, propsMapping, "f");
    this.scope = scope;
    __classPrivateFieldSet(this, _Field_fieldData, {
      blured: false,
      changed: false,
      errors: {},
      failedErrorMessages: [],
      focused: false,
      visible: !((_a = component.state) === null || _a === void 0 ? void 0 : _a.hidden),
      name: component.name,
      mounted: false
    }, "f");
    (0, _flows.register)(observer, _flows.fieldFlows, component);
  }
  get value() {
    if (__classPrivateFieldGet(this, _Field_propsMapping, "f").setValue && __classPrivateFieldGet(this, _Field_component, "f").props && this.scopedComponent.props && typeof this.scopedComponent.props[__classPrivateFieldGet(this, _Field_propsMapping, "f").setValue] !== 'undefined' && this.scopedComponent.props[__classPrivateFieldGet(this, _Field_propsMapping, "f").setValue] !== __classPrivateFieldGet(this, _Field_component, "f").props[__classPrivateFieldGet(this, _Field_propsMapping, "f").setValue]) {
      return this.scopedComponent.props[__classPrivateFieldGet(this, _Field_propsMapping, "f").setValue];
    }
    return __classPrivateFieldGet(this, _Field_fieldData, "f").mask || __classPrivateFieldGet(this, _Field_fieldData, "f").value;
  }
  set value(value) {
    __classPrivateFieldGet(this, _Field_fieldData, "f").value = value;
    this.scope.globalScope = {
      namespace: 'fields',
      key: __classPrivateFieldGet(this, _Field_component, "f").name,
      data: __classPrivateFieldGet(this, _Field_fieldData, "f")
    };
  }
  get component() {
    return __classPrivateFieldGet(this, _Field_component, "f");
  }
  get data() {
    return __classPrivateFieldGet(this, _Field_fieldData, "f");
  }
  set data(data) {
    __classPrivateFieldSet(this, _Field_fieldData, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Field_fieldData, "f")), data), "f");
    this.scope.globalScope = {
      namespace: 'fields',
      key: __classPrivateFieldGet(this, _Field_component, "f").name,
      data: __classPrivateFieldGet(this, _Field_fieldData, "f")
    };
  }
  get isVisible() {
    return __classPrivateFieldGet(this, _Field_fieldData, "f").visible;
  }
  set visibility(visible) {
    __classPrivateFieldGet(this, _Field_fieldData, "f").visible = visible;
  }
  get scopedComponent() {
    return __classPrivateFieldGet(this, _Field_scopedComponent, "f");
  }
  set scopedComponent(component) {
    __classPrivateFieldSet(this, _Field_scopedComponent, component, "f");
  }
  get errors() {
    return __classPrivateFieldGet(this, _Field_fieldData, "f").errors;
  }
  set errors(errors) {
    __classPrivateFieldGet(this, _Field_fieldData, "f").errors = errors;
    this.scope.globalScope = {
      namespace: 'fields',
      key: __classPrivateFieldGet(this, _Field_component, "f").name,
      data: __classPrivateFieldGet(this, _Field_fieldData, "f")
    };
  }
  get props() {
    if (!this.scopedComponent.name || !__classPrivateFieldGet(this, _Field_propsMapping, "f")) return this.scopedComponent.props;
    const propsActionsMapping = {
      getValue: event => this.publish(Events.BUILD_EVENT("ON_FIELD_CHANGE" /* Events.EEVents.ON_FIELD_CHANGE */, this.component.name), {
        event
      }),
      onBlur: event => this.publish(Events.BUILD_EVENT("ON_FIELD_BLUR" /* Events.EEVents.ON_FIELD_BLUR */, this.component.name), {
        event
      }),
      onFocus: event => this.publish(Events.BUILD_EVENT("ON_FIELD_FOCUS" /* Events.EEVents.ON_FIELD_FOCUS */, this.component.name), {
        event
      }),
      setValue: this.value,
      setErrorMessage: this.getFieldErrorMessages()[0]
    };
    return Object.keys(__classPrivateFieldGet(this, _Field_propsMapping, "f")).reduce((acc, key) => {
      if (typeof propsActionsMapping[key] === 'undefined') return acc;
      return Object.assign(Object.assign({}, acc), {
        [__classPrivateFieldGet(this, _Field_propsMapping, "f")[key]]: propsActionsMapping[key]
      });
    }, __classPrivateFieldGet(this, _Field_scopedComponent, "f").props);
  }
  get mappings() {
    return __classPrivateFieldGet(this, _Field_propsMapping, "f");
  }
  getFieldErrorMessages(data = __classPrivateFieldGet(this, _Field_fieldData, "f")) {
    if (!data.errors) return [];
    return Object.keys(data.errors).reduce((acc, key) => {
      const {
        errors = {}
      } = data;
      if (!errors[key].fail) return acc;
      if (!this.scopedComponent.errorMessages) {
        return acc;
      }
      return [...acc, this.scopedComponent.errorMessages[key] || this.scopedComponent.errorMessages.default];
    }, []);
  }
  fieldHasError(errors) {
    if (!errors) {
      errors = __classPrivateFieldGet(this, _Field_fieldData, "f").errors || {};
    }
    return !!Object.keys(errors).find(key => errors && errors[key].fail, []);
  }
  fieldValidationsHaveError(setErrorMessages) {
    if (!__classPrivateFieldGet(this, _Field_scopedComponent, "f").validations || !__classPrivateFieldGet(this, _Field_fieldData, "f").visible) return false;
    return !!Object.keys(__classPrivateFieldGet(this, _Field_scopedComponent, "f").validations).find(key => {
      const {
        validations = {},
        errorMessages
      } = __classPrivateFieldGet(this, _Field_scopedComponent, "f");
      const error = apis.validations.run(__classPrivateFieldGet(this, _Field_fieldData, "f").value, validations[key], errorMessages);
      if (setErrorMessages) {
        this.errors = error;
      }
      return this.fieldHasError(error);
    });
  }
  /**
   *
    Calculates and returns the version of the current scoped object for a given event
   */
  eventReducedSchema(event) {
    return {
      api: __classPrivateFieldGet(this, _Field_scopedComponent, "f").api && __classPrivateFieldGet(this, _Field_scopedComponent, "f").api[event],
      clearFields: __classPrivateFieldGet(this, _Field_scopedComponent, "f").clearFields && __classPrivateFieldGet(this, _Field_scopedComponent, "f").clearFields[event],
      rehydrate: __classPrivateFieldGet(this, _Field_scopedComponent, "f").rehydrate && __classPrivateFieldGet(this, _Field_scopedComponent, "f").rehydrate[event],
      formatters: __classPrivateFieldGet(this, _Field_scopedComponent, "f").formatters && __classPrivateFieldGet(this, _Field_scopedComponent, "f").formatters[event],
      masks: __classPrivateFieldGet(this, _Field_scopedComponent, "f").masks && __classPrivateFieldGet(this, _Field_scopedComponent, "f").masks[event],
      validations: __classPrivateFieldGet(this, _Field_scopedComponent, "f").validations && __classPrivateFieldGet(this, _Field_scopedComponent, "f").validations[event],
      visibilityConditions: __classPrivateFieldGet(this, _Field_scopedComponent, "f").visibilityConditions && __classPrivateFieldGet(this, _Field_scopedComponent, "f").visibilityConditions[event]
    };
  }
  rehydrate() {
    this.publish(Events.BUILD_EVENT("ON_FIELD_REHYDRATE" /* Events.EEVents.ON_FIELD_REHYDRATE */, __classPrivateFieldGet(this, _Field_component, "f").name));
  }
}
_Field_fieldData = new WeakMap(), _Field_component = new WeakMap(), _Field_scopedComponent = new WeakMap(), _Field_propsMapping = new WeakMap();
var _default = Field;
exports.default = _default;