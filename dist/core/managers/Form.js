"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Field = _interopRequireDefault(require("./Field.js"));
var _Base = _interopRequireDefault(require("./Base.js"));
var Events = _interopRequireWildcard(require("../events/index.js"));
var _flows = require("../handlers/flows.js");
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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
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
var _Form_fields, _Form_observer, _Form_step;
class Form extends _Base.default {
  constructor(formId, observer, scope, schema, initialValues = {}) {
    super(observer);
    _Form_fields.set(this, {});
    _Form_observer.set(this, void 0);
    _Form_step.set(this, void 0);
    this.steps = {};
    __classPrivateFieldSet(this, _Form_observer, observer, "f");
    this.schema = schema;
    this.scope = scope;
    this.formId = formId;
    this.initialValues = initialValues;
    __classPrivateFieldSet(this, _Form_step, {
      numSteps: schema === null || schema === void 0 ? void 0 : schema.components.length,
      navigated: false,
      index: 0,
      currentStepSchema: schema === null || schema === void 0 ? void 0 : schema.components[0],
      isValid: false,
      data: {}
    }, "f");
    this.formData = {
      predictableErroredFields: [],
      erroredFields: [],
      fields: {},
      formatted: {},
      form: {
        scope: scope.getGlobalScope(),
        steps: __classPrivateFieldGet(this, _Form_step, "f"),
        isValid: false,
        messages: []
      }
    };
    (0, _flows.register)(observer, _flows.formFlows);
  }
  get step() {
    return __classPrivateFieldGet(this, _Form_step, "f");
  }
  set step(step) {
    __classPrivateFieldSet(this, _Form_step, step, "f");
  }
  get fields() {
    return __classPrivateFieldGet(this, _Form_fields, "f") || {};
  }
  getFieldInstance(component, propsMapping = {}) {
    component.name = component.name || component.component + '_' + JSON.stringify(component.props);
    if (!this.steps[__classPrivateFieldGet(this, _Form_step, "f").index]) {
      this.steps[__classPrivateFieldGet(this, _Form_step, "f").index] = {};
    }
    if (this.fields[component.name]) {
      return this.fields[component.name];
    }
    this.fields[component.name] = new _Field.default(__classPrivateFieldGet(this, _Form_observer, "f"), component, propsMapping, this.scope);
    this.steps[__classPrivateFieldGet(this, _Form_step, "f").index][component.name] = this.fields[component.name];
    return this.fields[component.name];
  }
  rehydrate() {
    this.publish(Events.CoreEvents.ON_FORM_REHYDRATE);
  }
  destroyField(field) {
    if (!__classPrivateFieldGet(this, _Form_fields, "f")[field]) return;
    delete __classPrivateFieldGet(this, _Form_fields, "f")[field];
    delete this.steps[__classPrivateFieldGet(this, _Form_step, "f").index][field];
  }
}
_Form_fields = new WeakMap(), _Form_observer = new WeakMap(), _Form_step = new WeakMap();
var _default = Form;
exports.default = _default;