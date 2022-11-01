"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var utils = _interopRequireWildcard(require("../../utils/index.js"));
var apis = _interopRequireWildcard(require("../../apis/index.js"));
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
const handler = ({
  form
}) => {
  const buildFormMessages = data => {
    var _a;
    if (!((_a = form.schema) === null || _a === void 0 ? void 0 : _a.messages)) {
      return [];
    }
    return Object.keys(form.schema.messages).reduce((acc, key) => {
      var _a, _b, _c;
      const fieldValue = utils.object.getValueByPath(data, key);
      if (!((_a = form.schema) === null || _a === void 0 ? void 0 : _a.messages) || !((_b = form.schema) === null || _b === void 0 ? void 0 : _b.messages[key])) return acc;
      if (((_c = form.schema.messages[key].values) === null || _c === void 0 ? void 0 : _c.includes(fieldValue)) || form.schema.messages[key].value === fieldValue || form.schema.messages[key].required === true && !fieldValue) {
        return [...acc, form.schema.messages[key].name];
      }
      return acc;
    }, []);
  };
  const areFormValidationsValid = data => {
    if (!form.schema || !form.schema.validations) return true;
    return !apis.validations.hasError(apis.validations.run(data, form.schema.validations));
  };
  const fieldsData = fields => {
    var _a;
    return Object.keys(fields).reduce((acc, key) => {
      var _a, _b, _c, _d, _e;
      const field = form.fields[key];
      const fieldValues = field.data;
      if (!field || !field.data.visible || !field.data.name) return acc;
      let group = '';
      if ((_a = field.component) === null || _a === void 0 ? void 0 : _a.group) {
        group = field.component.group || '';
      }
      const mergedKey = group || key;
      const value = typeof fieldValues.value === 'undefined' ? form.initialValues[key] || ((_b = form.schema) === null || _b === void 0 ? void 0 : _b.formattedDataDefaults) && ((_c = form.schema) === null || _c === void 0 ? void 0 : _c.formattedDataDefaults[key]) : fieldValues.value;
      return {
        erroredFields: field.fieldHasError() ? [...acc.erroredFields, key] : acc.erroredFields,
        predictableErroredFields: field.fieldValidationsHaveError() ? [...acc.predictableErroredFields, key] : acc.predictableErroredFields,
        fields: Object.assign(Object.assign({}, acc.fields), {
          [key]: fieldValues
        }),
        filteredFields: ((_e = (_d = form.schema) === null || _d === void 0 ? void 0 : _d.filteredFields) === null || _e === void 0 ? void 0 : _e.includes(mergedKey)) ? Object.assign(Object.assign(Object.assign({}, acc.filteredFields), typeof value === 'undefined' ? {} : {
          [mergedKey]: value
        }), group ? {
          [group]: value ? value : acc.formatted[group]
        } : {}) : acc.filteredFields,
        formatted: Object.assign(Object.assign(Object.assign({}, acc.formatted), typeof (fieldValues === null || fieldValues === void 0 ? void 0 : fieldValues.value) === 'undefined' ? {} : utils.object.encapsulateIn(acc.formatted, key, fieldValues === null || fieldValues === void 0 ? void 0 : fieldValues.value) || {
          [key]: value
        }), group ? {
          [group]: value ? value : acc.formatted[group]
        } : {})
      };
    }, {
      predictableErroredFields: [],
      erroredFields: [],
      fields: {},
      formatted: Object.assign({}, (_a = form.schema) === null || _a === void 0 ? void 0 : _a.formattedDataDefaults),
      filteredFields: {}
    });
  };
  const formData = fieldsData(form.fields);
  const stepData = fieldsData(form.steps[form.step.index] || {});
  const result = Object.assign(Object.assign({}, formData), {
    form: {
      scope: form.scope.getGlobalScope(),
      steps: Object.assign(Object.assign({}, form.step), {
        data: {
          [form.step.index]: stepData
        },
        isValid: !stepData.predictableErroredFields.length
      }),
      isValid: !formData.predictableErroredFields.length && areFormValidationsValid(formData.formatted),
      messages: buildFormMessages(Object.assign(Object.assign({}, form.initialValues), formData.formatted))
    }
  });
  form.formData = result;
  return result;
};
exports.handler = handler;