"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Events = _interopRequireWildcard(require("../events/index.js"));
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
var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = void 0 && (void 0).__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _Scope_scope;
class Scope extends _Base.default {
  constructor(observer) {
    super(observer);
    _Scope_scope.set(this, {
      global: {},
      api: {},
      hooks: {},
      configs: {},
      fields: {}
    });
  }
  get scope() {
    return __classPrivateFieldGet(this, _Scope_scope, "f") || {};
  }
  getGlobalScope(namespace, key) {
    if (namespace && !key && this.scope[namespace]) return this.scope[namespace];
    if (namespace && key && this.scope[namespace]) return this.scope[namespace][key];
    return __classPrivateFieldGet(this, _Scope_scope, "f");
  }
  set initialScope(data) {
    __classPrivateFieldSet(this, _Scope_scope, data || __classPrivateFieldGet(this, _Scope_scope, "f"), "f");
  }
  set globalScope({
    namespace,
    key,
    data
  }) {
    if (!key) {
      __classPrivateFieldGet(this, _Scope_scope, "f")[namespace] = data;
    }
    if (key && !__classPrivateFieldGet(this, _Scope_scope, "f")[namespace]) {
      __classPrivateFieldGet(this, _Scope_scope, "f")[namespace] = {
        [key]: data
      };
    }
    if (__classPrivateFieldGet(this, _Scope_scope, "f")[namespace] && key) {
      __classPrivateFieldGet(this, _Scope_scope, "f")[namespace] = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Scope_scope, "f")[namespace]), {
        [key]: data
      });
    }
    // If no key is given, we will build one event based on regex to match all keys for a given namespace
    const eventName = key ? Events.BUILD_EVENT("ON_SCOPE_CHANGE" /* Events.EEVents.ON_SCOPE_CHANGE */, namespace, key) : Events.ALL_NAMESPACE_EVENTS(Events.BUILD_EVENT("ON_SCOPE_CHANGE" /* Events.EEVents.ON_SCOPE_CHANGE */, namespace, key));
    this.publish(eventName, {
      scope: this.scope,
      namespace,
      key
    });
  }
}
_Scope_scope = new WeakMap();
var _default = Scope;
exports.default = _default;