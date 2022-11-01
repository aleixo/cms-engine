/**
 *
 * This file will allow to expose functions to be used as formatters in schema and HOC
 *
 * Since it is a formatter, you can also expose its "undo" function that will allow form to make logic on the value without the
 * formatter applied
 *
 * EG:
 * splitter -> 22/33/4444
 * undo_splitter -> 22334444
 *
 * This undo will be called when the form is filtering the data on the input if it has formatters configured
 */
import { TSchemaFormatters } from '../types.js';
declare const run: (value: any, componentFormatters: TSchemaFormatters, undo?: boolean) => string | number;
export { run };
