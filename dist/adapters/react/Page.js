"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Form = _interopRequireDefault(require("./Form.js"));
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
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Page = ({
  schema,
  renderFieldWrapper
}) => {
  const {
    mapper: Mapper
  } = (0, _react.useContext)(_context.FormContext);
  const Child = () => {
    const generateComponentChildren = (children, componentLevel = 0) => {
      return children === null || children === void 0 ? void 0 : children.map(component => {
        var _a;
        if (component.component === '__FORM__CONTAINER__') {
          const {
              children
            } = component,
            rest = __rest(component, ["children"]);
          const schema = Object.assign(Object.assign({}, rest), {
            components: [{
              component: '',
              name: '',
              children: component.children
            }]
          });
          if (renderFieldWrapper) {
            return renderFieldWrapper(schema, {}, /*#__PURE__*/_react.default.createElement(_Form.default, {
              renderFieldWrapper: renderFieldWrapper,
              id: component.name,
              schema: schema
            }));
          }
          return /*#__PURE__*/_react.default.createElement(_Form.default, {
            renderFieldWrapper: renderFieldWrapper,
            id: component.name,
            schema: schema
          });
        }
        const Element = (_a = Mapper[component.component]) === null || _a === void 0 ? void 0 : _a.component;
        if (renderFieldWrapper) {
          return renderFieldWrapper(component, {}, /*#__PURE__*/_react.default.createElement(Element, Object.assign({}, component.props), Array.isArray(component.children) ? generateComponentChildren(component.children, componentLevel + 1) : component.children));
        }
        return /*#__PURE__*/_react.default.createElement(Element, Object.assign({}, component.props), Array.isArray(component.children) ? generateComponentChildren(component.children, componentLevel + 1) : component.children);
      });
    };
    return generateComponentChildren(schema);
  };
  return Child();
};
var _default = Page;
exports.default = _default;