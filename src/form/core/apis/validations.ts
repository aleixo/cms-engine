import { TErrorMessages, TError, TErrors } from 'core/types';
import * as utils from 'core/utils';

type TRuleValue = string | number | boolean | undefined;
type TValidationValue = string | number | boolean | (() => boolean);
type TRules = Record<string, unknown>;
type TRuleFunction = (data: TErrorArgumentsGeneric) => TError;

type TErrorArgumentsGeneric = {
  value: TRuleValue;
  validationValue: TValidationValue;
  errorMessage: string;
};

interface TGreaterThan extends TErrorArgumentsGeneric {
  value: string;
  validationValue: string;
}

interface TLessThan extends TErrorArgumentsGeneric {
  value: string;
  validationValue: string;
}

interface TNumericRange {
  value: number;
  validationValue: { start: number; end: number };
  errorMessage: string;
}

interface TRegex extends TErrorArgumentsGeneric {
  value: string;
  validationValue: string;
}

interface TPath {
  value: Record<string, any>;
  validationValue: Record<string, unknown>;
}

interface TCallback {
  value: string;
  validationValue: (value: string | number) => {
    errorMessage: string;
    fail: boolean;
  };
}

interface IValidationCreditCard {
  value: string;
  validationValue: string[];
}

interface IValidationList {
  value: string | number;
  validationValue: string[] | number[];
}

type TCustomValidation = {
  value: string;
  validationValue: ICustomValidationValue[];
};

export interface ICustomValidationValue {
  from: number;
  to: number;
  validations: Record<string, any>;
}

interface TMaxLength extends TErrorArgumentsGeneric {
  value: string;
  validationValue: string | number | boolean;
}

type TErrorReturn = {
  fail: boolean;
  message?: string;
  metadata?: Record<string, unknown>;
};
// ERROR HELPERS
const searchFailedError = (errors: TErrors) => {
  const defaultResponse = { fail: false };

  if (!errors) return defaultResponse;
  return Object.keys(errors).reduce((acc, key) => {
    return errors[key].fail ? errors[key] : acc;
  }, defaultResponse);
};

// VALIDATIONS

const length = ({ value, validationValue }: TErrorArgumentsGeneric): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (typeof targetValue !== 'string') {
    targetValue = value?.toString();
  }

  return { fail: !value || targetValue?.length === validationValue };
};

const greaterThan = ({ value, validationValue }: TGreaterThan): TErrorReturn => {
  return { fail: !value || parseInt(value) <= parseInt(validationValue) };
};

const lessThan = ({ value, validationValue }: TLessThan): TErrorReturn => {
  return { fail: !value || parseInt(value) >= parseInt(validationValue) };
};

const maxLength = ({ value = '', validationValue }: TMaxLength): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }

  return {
    fail: targetValue.length > validationValue,
  };
};

const minLength = ({ value = '', validationValue }: TMaxLength): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }

  return {
    fail: targetValue.length < validationValue,
  };
};

const required = ({ value }: TErrorArgumentsGeneric): TErrorReturn => {
  return {
    fail: !value,
  };
};

const value = ({ value, validationValue }: TErrorArgumentsGeneric): TErrorReturn => {
  return { fail: value !== validationValue };
};

const regex = ({ value, validationValue }: TRegex): TErrorReturn => {
  const regex = new RegExp(validationValue as string);
  const fail = !regex.test(value);

  return { fail };
};

const email = ({ value }: TRegex): TErrorReturn => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fail = !regex.test(value as string);

  return { fail };
};

const isCreditCard = ({ value, validationValue }: IValidationCreditCard): TErrorReturn => {
  if (!value) return { fail: true };

  const [type] = utils.creditCard.getTypeCard(value, validationValue);

  return {
    fail: !type,
    metadata: { typeCard: type?.type, creditCardCC: type?.code?.name, creditCardCCSize: type?.code?.size },
  };
};

const isCreditCodeMatch = ({
  value,
  validationValue,
}: {
  value: string;
  validationValue: { numberCard: string; availableOptions: string[] };
}): TErrorReturn => {
  if (!value) return { fail: true };
  const [type] = utils.creditCard.getTypeCard(validationValue.numberCard, validationValue.availableOptions);
  return { fail: type?.code?.size !== value.length };
};

const isCreditCardAndLength = ({ value, validationValue }: IValidationCreditCard): TErrorReturn => {
  if (!value) return { fail: true };

  const [type, rawValue] = utils.creditCard.getTypeCard(value, validationValue);
  const fail = type && !type.lengths.includes(rawValue.length);
  return { fail };
};

const url = ({ value }: TRegex): TErrorReturn => {
  const regex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
  const fail = !regex.test(value as string);

  return { fail };
};

const onlyLetters = ({ value }: TRegex): TErrorReturn => {
  const fail = !/^[a-zA-Z\s]*$/.test(value);

  return { fail };
};

const customValidation = ({ value, validationValue }: TCustomValidation): TErrorReturn => {
  return generic({ value, validationValue });
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

const generic = ({ value = '', validationValue }: TCustomValidation): TErrorReturn => {
  const fail = validationValue.some((item) => {
    const { to, from, validations } = item;

    const substring = value.substring(to, from);
    return hasError(run(substring, validations));
  });
  return { fail };
};

const notAllowSpaces = ({ value }: TRegex): TErrorReturn => {
  const fail = /\s/.test(value);
  return { fail };
};

const callback = ({ value, validationValue }: TCallback): TErrorReturn => {
  const result = validationValue(value);

  return {
    message: result.errorMessage,
    fail: result.fail,
  };
};

const isNumber = ({ value }: TRegex): TErrorReturn => {
  const fail = !!value && !/^[0-9\s]*$/.test(value);
  return { fail };
};

const notEmpty = ({ value }: TRegex): TErrorReturn => {
  return { fail: !value.trim().length };
};

/**
 * Check if has tralling/landing spaces.
 */
const hasNoExtraSpaces = ({ value }: TRegex): TErrorReturn => {
  const regexToCheckTrailingSpaces = '^[A-Za-z0-9.-]+(?: +[A-Za-z0-9.-]+)*$';

  const { fail } = regex({
    value,
    validationValue: regexToCheckTrailingSpaces,
    errorMessage: '',
  });

  return { fail };
};

const numericRange = ({ value, validationValue }: TNumericRange): TErrorReturn => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail =
    !replacedValue ||
    !Number.isInteger(parseInt(replacedValue.toString())) ||
    +replacedValue > validationValue.end ||
    +replacedValue < validationValue.start;

  return {
    fail,
  };
};

const isInTheList = ({ value, validationValue }: IValidationList): TErrorReturn => {
  if (!value || !Array.isArray(validationValue)) return { fail: true };
  return { fail: !validationValue.some((code) => code === value || JSON.stringify(code) === value) };
};

const sequentialNumber = ({ value }: TErrorArgumentsGeneric) => {
  const numbers = '0123456789';
  const numbersRev = '9876543210';
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail = !(numbers.indexOf(replacedValue) === -1 && numbersRev.indexOf(replacedValue) === -1);

  return { fail };
};

const repeatedNumbers = ({ value }: TErrorArgumentsGeneric) => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const regex = /\b(\d)\1+\b/gm;
  const fail = regex.test(replacedValue);

  return { fail };
};

const path = ({ value, validationValue }: TPath): TErrorReturn => {
  const searchErrorInPath = (path: string) => {
    const valueForPath = utils.object.getValueByPath(value, path as string);
    if (validationValue.preventUnMountValidation && !(path in value)) {
      return { fail: false };
    }
    const validationsResult = run(valueForPath as string, validationValue);

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

  return searchErrorInPath(validationValue.path as string);
};

const validations: Record<string, unknown> = {
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
  isInTheList,
};

const run = (value: TRuleValue, rules: TRules, errorMessages: TErrorMessages = {}): TErrors => {
  let result = {};
  Object.keys(rules).forEach((key): void => {
    const validationValue = rules[key] as TValidationValue;
    const validationFN = validations[key] as TRuleFunction;

    if (!validationFN) return;

    const errorMessage = errorMessages[key] || errorMessages.default;
    const ruleResult = validationFN({
      value,
      validationValue,
      errorMessage: errorMessage,
    });
    result = {
      ...result,
      [key]: { ...ruleResult, validationValue, message: errorMessage },
    };
  });
  return result;
};

const generateCustomError = (name: string, message: string): TErrors => {
  return {
    [name]: {
      fail: true,
      message,
      value: undefined,
    },
  };
};

const hasError = (errors?: TErrors) => {
  if (!errors) {
    return false;
  }
  return !!Object.keys(errors).find((key) => errors && errors[key].fail, []);
};

export { run, generateCustomError, hasError };
