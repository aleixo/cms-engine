"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var utils = _interopRequireWildcard(require("../../utils/index.js"));
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
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const template = {
  BEGIN: '${',
  END: '}'
};
const handler = ({
  field
}) => {
  var _a, _b, _c, _d;
  if (!field) return;
  const {
    component
  } = field;
  const isFieldExcludedObservable = !((_d = (_c = (_b = (_a = field.scope.scope.configs) === null || _a === void 0 ? void 0 : _a.observables) === null || _b === void 0 ? void 0 : _b.templates) === null || _c === void 0 ? void 0 : _c.exclude) === null || _d === void 0 ? void 0 : _d.includes(field.component.name));
  const hasTemplateString = targetString => {
    return /\$\{(.*)\}.*/g.test(targetString);
  };
  const replaceTemplateString = targetString => {
    const lastIndex = targetString.lastIndexOf(template.BEGIN);
    if (lastIndex === -1) return targetString;
    const substringTemplate = targetString.substring(lastIndex + template.BEGIN.length, targetString.length);
    let match = substringTemplate.substring(0, substringTemplate.indexOf(template.END));
    const originalMatchLength = match.length;
    let defaultValue = '';
    const parts = match.split('||');
    if (parts.length > 1) {
      match = parts[0];
      defaultValue = utils.object.getValueByPath(field.scope.getGlobalScope(), parts[1]) || parts[1];
    }
    const matchingParts = parts[0].split('.');
    isFieldExcludedObservable && field.subscribe(Events.BUILD_EVENT("ON_SCOPE_CHANGE" /* Events.EEVents.ON_SCOPE_CHANGE */, matchingParts[0], matchingParts[1]), () => {
      field.scopedComponent = scopeComponent();
      field.rehydrate();
    });
    const scopedTemplateValue = utils.object.getValueByPath(field.scope.getGlobalScope(), match);
    let value = typeof scopedTemplateValue === 'undefined' ? defaultValue : scopedTemplateValue;
    // If we are interested in other data than string and its the only data we have in the template, we just return it
    if (typeof value !== 'string' && lastIndex === 0) {
      return value;
    }
    // Otherwise, we just stringify it and ussume the client will use as string
    try {
      value = JSON.stringify(value).replace(/^"(.*)"$/, '$1');
      // eslint-disable-next-line no-empty
    } catch (e) {}
    const scopedString = targetString.substring(0, lastIndex) + value + targetString.substring(lastIndex + originalMatchLength + template.BEGIN.length + template.END.length, targetString.length);
    return replaceTemplateString(scopedString);
  };
  const inObject = (obj, recursionLevel = 0) => {
    if (typeof obj === 'string') {
      return replaceTemplateString(obj);
    }
    if (typeof obj === 'number') {
      return obj;
    }
    const object = Object.assign({}, obj);
    return Object.keys(object).reduce((acc, key) => {
      if (object[key] === null) {
        return acc;
      }
      if (Array.isArray(object[key])) {
        return Object.assign(Object.assign({}, acc), {
          [key]: object[key].map(inObject)
        });
      }
      if (typeof object[key] === 'object') {
        return Object.assign(Object.assign({}, acc), {
          [key]: Object.assign({}, inObject(Object.assign({}, object[key]), recursionLevel + 1))
        });
      }
      if (typeof object[key] !== 'string') {
        return Object.assign(Object.assign({}, acc), {
          [key]: object[key]
        });
      }
      if (!hasTemplateString(object[key])) {
        return Object.assign(Object.assign({}, acc), {
          [key]: object[key]
        });
      }
      let value = replaceTemplateString(object[key]);
      try {
        value = JSON.parse(replaceTemplateString(object[key]));
        // eslint-disable-next-line no-empty
      } catch (e) {}
      return Object.assign(Object.assign({}, acc), {
        [key]: value
      });
    }, {});
  };
  const scopeComponent = () => {
    const {
        children,
        wrapper
      } = component,
      rest = __rest(component, ["children", "wrapper"]);
    const scopedComponent = Object.assign({}, inObject(rest));
    return Object.assign(Object.assign(Object.assign({}, rest), scopedComponent), {
      children,
      wrapper
    });
  };
  field.scopedComponent = scopeComponent();
};
exports.handler = handler;