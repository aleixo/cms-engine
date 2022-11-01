"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = exports.EXTRACT_EVENT_NAMESPACE = exports.BUILD_EVENT = exports.ALL_NAMESPACE_EVENTS = void 0;
var _index = require("../managers/index.js");
var _eventsTypes = require("./events.types.js");
var _ObserverError = require("./ObserverError.js");
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
var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Observer_buildEventPayload;
/* eslint-disable @typescript-eslint/no-explicit-any */

const EXTRACT_EVENT_NAMESPACE = event => event.split('/')[1] || '';
exports.EXTRACT_EVENT_NAMESPACE = EXTRACT_EVENT_NAMESPACE;
const EXTRACT_CORE_NAMESPACE = event => Array.isArray(event.split('/')) ? event.split('/')[0] : event;
const BUILD_EVENT = (event, namespace, key) => {
  if (!namespace) return event;
  return event + '/' + namespace + (key ? '/' + key : '');
};
exports.BUILD_EVENT = BUILD_EVENT;
const ALL_NAMESPACE_EVENTS = event => new RegExp(`^(${event}).*$`, 'g');
exports.ALL_NAMESPACE_EVENTS = ALL_NAMESPACE_EVENTS;
class Observer {
  constructor(namespace, enableLogging = false) {
    this.regexBasedEvents = {};
    this.events = {};
    _Observer_buildEventPayload.set(this, ({
      event,
      data,
      payload
    }) => {
      const eventFieldName = EXTRACT_EVENT_NAMESPACE(event);
      const form = (0, _index.getFormInstance)(this.namespace);
      const field = form.fields[eventFieldName];
      return {
        eventReducedSchema: field && field.eventReducedSchema(EXTRACT_CORE_NAMESPACE(event)),
        coreEvent: EXTRACT_CORE_NAMESPACE(event),
        namespace: this.namespace,
        form,
        field,
        event,
        data,
        payload
      };
    });
    this.namespace = namespace;
    this.enableLogging = enableLogging;
  }
  runForRegexBasedEvent(eventName, cb) {
    let isMatchEvent = false;
    for (const event of Object.keys(this.events)) {
      isMatchEvent = eventName.test(event);
      isMatchEvent && cb(event);
    }
    return isMatchEvent;
  }
  handleRegexSubscription(eventName, handler) {
    this.logInfo(_eventsTypes.EFlowLogging.OBSERVER, eventName, 'handleRegexSubscription');
    const foundEvent = this.runForRegexBasedEvent(eventName, event => this.subscribe(event, handler));
    if (!foundEvent) {
      this.regexBasedEvents[eventName] = {
        regex: eventName,
        handlers: Array.isArray(this.events[eventName]) ? [...this.events[eventName], handler] : [handler]
      };
    }
  }
  /**
   * This function lets you subscribe to a given event and register one callback to be called when someone published in it
   *
   * The callback you redister will, return you the published data and one function to unregister your callback from that event
   *
   */
  subscribe(eventName, handler) {
    if (typeof eventName === 'object') {
      this.handleRegexSubscription(eventName, handler);
      return () => {};
    }
    this.logInfo(_eventsTypes.EFlowLogging.OBSERVER, eventName, 'subscribe');
    this.events = Object.assign(Object.assign({}, this.events), {
      [eventName]: Array.isArray(this.events[eventName]) ? [...this.events[eventName], handler] : [handler]
    });
    return () => {
      this.unsubscribe(eventName, handler);
    };
  }
  unsubscribe(eventName, handler) {
    this.logInfo(_eventsTypes.EFlowLogging.OBSERVER, eventName, 'unsubscribe');
    this.events = Object.assign(Object.assign({}, this.events), {
      [eventName]: this.events[eventName].filter(eventFn => eventFn !== handler)
    });
  }
  isAsyncFunction(fn) {
    const string = fn.toString().trim();
    return !!(fn[Symbol.toStringTag] === 'AsyncFunction' || fn.constructor.name == 'AsyncFunction' || string.match(/^async /) || string.match(/return _ref[^\\.]*\.apply/) || fn instanceof Promise);
  }
  /**
   * Allows to publish data to a given event name
   *
   * Will iterate the subscriptions and call their handlers.
   *
   * When calling the handler, will also inject the unsubscribe function
   *
   * This methods also accepts one regex and will find the matchin events and
   * publish in them
   *
   */
  publish(eventName, data) {
    return __awaiter(this, void 0, void 0, function* () {
      if (typeof eventName === 'object') {
        this.runForRegexBasedEvent(eventName, event => this.publish(event, data));
        return;
      }
      for (const regexEvent of Object.keys(this.regexBasedEvents)) {
        const isMatchEvent = new RegExp(this.regexBasedEvents[regexEvent].regex).test(eventName);
        if (isMatchEvent) {
          this.publishForEvents(eventName, data, {
            [eventName]: this.regexBasedEvents[regexEvent].handlers
          });
        }
      }
      return this.publishForEvents(eventName, data, this.events);
    });
  }
  publishForEvents(eventName, data = {}, events) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!events[eventName]) return {};
      let lastCallbackResult = {};
      for (const fn of events[eventName]) {
        try {
          if (!fn) return;
          const payload = __classPrivateFieldGet(this, _Observer_buildEventPayload, "f").call(this, {
            data: Object.assign(Object.assign({}, data), lastCallbackResult),
            payload: data,
            event: eventName,
            namespace: this.namespace
          });
          const isAsync = this.isAsyncFunction(fn);
          this.logInfo(_eventsTypes.EFlowLogging.OBSERVER, eventName, 'publish', payload);
          const handlerRes = isAsync ? yield fn(payload, () => this.unsubscribe(eventName, fn)) : fn(payload, () => this.unsubscribe(eventName, fn));
          lastCallbackResult = Object.assign(Object.assign({}, lastCallbackResult), handlerRes);
        } catch (e) {
          if (e instanceof _ObserverError.ObserverError && e.breaksObservingChain) {
            this.logError(_eventsTypes.EFlowLogging.OBSERVER, eventName, 'publish', e);
            return {};
          }
          throw e;
        }
      }
      return Object.assign(Object.assign({}, lastCallbackResult), (0, _index.getFormInstance)(this.namespace).formData);
    });
  }
  logError(flow, event, method, error) {
    if (!this.enableLogging) return;
    event !== "LOG" /* EEVents.LOG */ && this.publish("LOG" /* EEVents.LOG */, {
      level: 'error',
      data: {
        event,
        error
      },
      action: method,
      flow
    });
  }
  logInfo(flow, event, method, extraData) {
    if (!this.enableLogging) return;
    event !== "LOG" /* EEVents.LOG */ && this.publish("LOG" /* EEVents.LOG */, {
      level: 'info',
      data: Object.assign({
        event
      }, extraData),
      action: method,
      flow
    });
  }
}
exports.Observer = Observer;
_Observer_buildEventPayload = new WeakMap();