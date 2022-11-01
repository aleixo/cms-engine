"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
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
var _Base_observer, _Base_debounceQueue;
class Base {
  constructor(observer) {
    _Base_observer.set(this, void 0);
    _Base_debounceQueue.set(this, {});
    this.debounceTime = 50;
    this.debounce = (fn, debounceTime = this.debounceTime) => __awaiter(this, void 0, void 0, function* () {
      return new Promise(resolve => {
        if (__classPrivateFieldGet(this, _Base_debounceQueue, "f")[fn]) [clearTimeout(__classPrivateFieldGet(this, _Base_debounceQueue, "f")[fn])];
        __classPrivateFieldGet(this, _Base_debounceQueue, "f")[fn] = setTimeout(() => {
          clearTimeout(__classPrivateFieldGet(this, _Base_debounceQueue, "f")[fn]);
          resolve(fn());
        }, debounceTime);
      });
    });
    __classPrivateFieldSet(this, _Base_observer, observer, "f");
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.debounce = this.debounce.bind(this);
    this.subscribeBulk = this.subscribeBulk.bind(this);
    this.subscriptions = {};
  }
  subscribe(event, cb) {
    if (this.subscriptions[event]) {
      this.subscriptions[event]();
    }
    this.subscriptions[event] = __classPrivateFieldGet(this, _Base_observer, "f").subscribe(event, cb);
  }
  subscribeBulk(events, cb) {
    events.forEach(event => this.subscribe(event, cb));
  }
  publish(events, data = {}) {
    __classPrivateFieldGet(this, _Base_observer, "f").publish(events, data);
  }
  publishFor(events) {
    return (data = {}) => __awaiter(this, void 0, void 0, function* () {
      const x = yield __classPrivateFieldGet(this, _Base_observer, "f").publish(events, data);
      return x;
    });
  }
  logError(file, event, method, error) {
    __classPrivateFieldGet(this, _Base_observer, "f").logError(file, event, method, error);
  }
  logInfo(file, event, method, extraData) {
    __classPrivateFieldGet(this, _Base_observer, "f").logInfo(file, event, method, extraData);
  }
}
_Base_observer = new WeakMap(), _Base_debounceQueue = new WeakMap();
var _default = Base;
exports.default = _default;