import { TErrorMessages, TErrors } from '../types.js';
declare type TRuleValue = string | number | boolean | undefined;
declare type TRules = Record<string, unknown>;
export interface ICustomValidationValue {
    from: number;
    to: number;
    validations: Record<string, any>;
}
declare const run: (value: TRuleValue, rules: TRules, errorMessages?: TErrorMessages) => TErrors;
declare const generateCustomError: (name: string, message: string) => TErrors;
declare const hasError: (errors?: TErrors) => boolean;
export { run, generateCustomError, hasError };
