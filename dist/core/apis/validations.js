"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.hasError = exports.generateCustomError = void 0;
var utils = _interopRequireWildcard(require("../utils/index.js"));
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
// ERROR HELPERS
const searchFailedError = errors => {
  const defaultResponse = {
    fail: false
  };
  if (!errors) return defaultResponse;
  return Object.keys(errors).reduce((acc, key) => {
    return errors[key].fail ? errors[key] : acc;
  }, defaultResponse);
};
// VALIDATIONS
const length = ({
  value,
  validationValue
}) => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (typeof targetValue !== 'string') {
    targetValue = value === null || value === void 0 ? void 0 : value.toString();
  }
  return {
    fail: !value || (targetValue === null || targetValue === void 0 ? void 0 : targetValue.length) === validationValue
  };
};
const greaterThan = ({
  value,
  validationValue
}) => {
  return {
    fail: !value || parseInt(value) <= parseInt(validationValue)
  };
};
const lessThan = ({
  value,
  validationValue
}) => {
  return {
    fail: !value || parseInt(value) >= parseInt(validationValue)
  };
};
const maxLength = ({
  value = '',
  validationValue
}) => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }
  return {
    fail: targetValue.length > validationValue
  };
};
const minLength = ({
  value = '',
  validationValue
}) => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }
  return {
    fail: targetValue.length < validationValue
  };
};
const required = ({
  value
}) => {
  return {
    fail: !value
  };
};
const value = ({
  value,
  validationValue
}) => {
  return {
    fail: value !== validationValue
  };
};
const regex = ({
  value,
  validationValue
}) => {
  const regex = new RegExp(validationValue);
  const fail = !regex.test(value);
  return {
    fail
  };
};
const email = ({
  value
}) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fail = !regex.test(value);
  return {
    fail
  };
};
const isCreditCard = ({
  value,
  validationValue
}) => {
  var _a, _b;
  if (!value) return {
    fail: true
  };
  const [type] = utils.creditCard.getTypeCard(value, validationValue);
  return {
    fail: !type,
    metadata: {
      typeCard: type === null || type === void 0 ? void 0 : type.type,
      creditCardCC: (_a = type === null || type === void 0 ? void 0 : type.code) === null || _a === void 0 ? void 0 : _a.name,
      creditCardCCSize: (_b = type === null || type === void 0 ? void 0 : type.code) === null || _b === void 0 ? void 0 : _b.size
    }
  };
};
const isCreditCodeMatch = ({
  value,
  validationValue
}) => {
  var _a;
  if (!value) return {
    fail: true
  };
  const [type] = utils.creditCard.getTypeCard(validationValue.numberCard, validationValue.availableOptions);
  return {
    fail: ((_a = type === null || type === void 0 ? void 0 : type.code) === null || _a === void 0 ? void 0 : _a.size) !== value.length
  };
};
const isCreditCardAndLength = ({
  value,
  validationValue
}) => {
  if (!value) return {
    fail: true
  };
  const [type, rawValue] = utils.creditCard.getTypeCard(value, validationValue);
  const fail = type && !type.lengths.includes(rawValue.length);
  return {
    fail
  };
};
const url = ({
  value
}) => {
  const regex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
  const fail = !regex.test(value);
  return {
    fail
  };
};
const onlyLetters = ({
  value
}) => {
  const fail = !/^[a-zA-Z\s]*$/.test(value);
  return {
    fail
  };
};
const customValidation = ({
  value,
  validationValue
}) => {
  return generic({
    value,
    validationValue
  });
};
/*   - Allow to use specific validations for specific position caracters
 *
 *    customValidation: [
 *     {
 *       from: 0,
 *       to: 2,
 *       validations: {
 *         greaterThan: date.getMonth(),
 *         lessThan: '13',
 *       }
 *     },
 *     {
 *       from: 3,
 *       to: 5,
 *       validations: {
 *         greaterThan: date.getFullYear().toString().substr(-2) - 1,
 *       }
 *     },
 *    ],
 */
const generic = ({
  value = '',
  validationValue
}) => {
  const fail = validationValue.some(item => {
    const {
      to,
      from,
      validations
    } = item;
    const substring = value.substring(to, from);
    return hasError(run(substring, validations));
  });
  return {
    fail
  };
};
const notAllowSpaces = ({
  value
}) => {
  const fail = /\s/.test(value);
  return {
    fail
  };
};
const callback = ({
  value,
  validationValue
}) => {
  const result = validationValue(value);
  return {
    message: result.errorMessage,
    fail: result.fail
  };
};
const isNumber = ({
  value
}) => {
  const fail = !!value && !/^[0-9\s]*$/.test(value);
  return {
    fail
  };
};
const notEmpty = ({
  value
}) => {
  return {
    fail: !value.trim().length
  };
};
/**
 * Check if has tralling/landing spaces.
 */
const hasNoExtraSpaces = ({
  value
}) => {
  const regexToCheckTrailingSpaces = '^[A-Za-z0-9.-]+(?: +[A-Za-z0-9.-]+)*$';
  const {
    fail
  } = regex({
    value,
    validationValue: regexToCheckTrailingSpaces,
    errorMessage: ''
  });
  return {
    fail
  };
};
const numericRange = ({
  value,
  validationValue
}) => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail = !replacedValue || !Number.isInteger(parseInt(replacedValue.toString())) || +replacedValue > validationValue.end || +replacedValue < validationValue.start;
  return {
    fail
  };
};
const isInTheList = ({
  value,
  validationValue
}) => {
  if (!value || !Array.isArray(validationValue)) return {
    fail: true
  };
  return {
    fail: !validationValue.some(code => code === value || JSON.stringify(code) === value)
  };
};
const sequentialNumber = ({
  value
}) => {
  const numbers = '0123456789';
  const numbersRev = '9876543210';
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail = !(numbers.indexOf(replacedValue) === -1 && numbersRev.indexOf(replacedValue) === -1);
  return {
    fail
  };
};
const repeatedNumbers = ({
  value
}) => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const regex = /\b(\d)\1+\b/gm;
  const fail = regex.test(replacedValue);
  return {
    fail
  };
};
const path = ({
  value,
  validationValue
}) => {
  const searchErrorInPath = path => {
    const valueForPath = utils.object.getValueByPath(value, path);
    if (validationValue.preventUnMountValidation && !(path in value)) {
      return {
        fail: false
      };
    }
    const validationsResult = run(valueForPath, validationValue);
    const res = searchFailedError(validationsResult);
    return res;
  };
  if (Array.isArray(validationValue.paths)) {
    return validationValue.paths.reduce((acc, path) => {
      const res = searchErrorInPath(path);
      if (res.fail) {
        return res;
      }
      return acc;
    }, {});
  }
  return searchErrorInPath(validationValue.path);
};
const validations = {
  length,
  greaterThan,
  maxLength,
  minLength,
  required,
  value,
  regex,
  hasNoExtraSpaces,
  isCreditCard,
  isCreditCardAndLength,
  isCreditCodeMatch,
  onlyLetters,
  notAllowSpaces,
  callback,
  isNumber,
  customValidation,
  notEmpty,
  numericRange,
  email,
  lessThan,
  sequentialNumber,
  repeatedNumbers,
  url,
  path,
  isInTheList
};
const run = (value, rules, errorMessages = {}) => {
  let result = {};
  Object.keys(rules).forEach(key => {
    const validationValue = rules[key];
    const validationFN = validations[key];
    if (!validationFN) return;
    const errorMessage = errorMessages[key] || errorMessages.default;
    const ruleResult = validationFN({
      value,
      validationValue,
      errorMessage: errorMessage
    });
    result = Object.assign(Object.assign({}, result), {
      [key]: Object.assign(Object.assign({}, ruleResult), {
        validationValue,
        message: errorMessage
      })
    });
  });
  return result;
};
exports.run = run;
const generateCustomError = (name, message) => {
  return {
    [name]: {
      fail: true,
      message,
      value: undefined
    }
  };
};
exports.generateCustomError = generateCustomError;
const hasError = errors => {
  if (!errors) {
    return false;
  }
  return !!Object.keys(errors).find(key => errors && errors[key].fail, []);
};
exports.hasError = hasError;