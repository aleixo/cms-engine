"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Scope = _interopRequireDefault(require("./Scope.js"));
var _index = require("../events/index.js");
var _Form = _interopRequireDefault(require("./Form.js"));
var _constants = require("../constants.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class Factory {
  constructor() {
    this.workers = {};
    this.getFormInstance = this.getFormInstance.bind(this);
  }
  getFormInstance(namespace = _constants.DEFAULT_FORM_ID, opts) {
    var _a, _b, _c;
    if (this.workers[namespace] && !(opts === null || opts === void 0 ? void 0 : opts.newInstance)) {
      return this.workers[namespace];
    }
    const observer = new _index.Observer(namespace, (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.initialScope) === null || _a === void 0 ? void 0 : _a.configs) === null || _b === void 0 ? void 0 : _b.enableLogging);
    const scope = new _Scope.default(observer);
    scope.initialScope = Object.assign(Object.assign({}, opts === null || opts === void 0 ? void 0 : opts.initialScope), (_c = opts === null || opts === void 0 ? void 0 : opts.schema) === null || _c === void 0 ? void 0 : _c.iVars);
    this.workers[namespace] = new _Form.default(namespace, observer, scope, opts === null || opts === void 0 ? void 0 : opts.schema, opts === null || opts === void 0 ? void 0 : opts.initialValues);
    return this.workers[namespace];
  }
}
var _default = Factory;
exports.default = _default;