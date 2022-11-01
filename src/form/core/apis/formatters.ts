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
import { TSplitterFormatterValue, TSchemaFormatters } from 'core/types';
import * as utils from 'core/utils';
type TFormatterFunction = (data: { value: string | number; formatterValue: unknown; onBlur?: boolean }) => string;

const splitter = ({ value, formatterValue }: { value: string; formatterValue: TSplitterFormatterValue }): string => {
  if (!value) return value;

  let formattedValue = undo_splitter({ value, formatterValue });
  formatterValue.forEach((formatter): void => {
    if (formatter.position >= value.length) {
      return;
    }

    formattedValue =
      formattedValue.slice(0, formatter.position) +
      formatter.value +
      formattedValue.slice(formatter.position, formattedValue?.length);
  });
  return formattedValue;
};

const undo_splitter = ({
  value,
  formatterValue,
}: {
  value: string;
  formatterValue: TSplitterFormatterValue;
}): string => {
  if (!value) return value;
  let originalValue = '';
  let formattersApplied = 0;
  formatterValue.forEach((formatter, i) => {
    const nextStartingIndex = i === 0 ? i : formatterValue[i - 1].position + 1;
    if (value[formatter.position] == formatter.value) {
      formattersApplied++;
    }
    originalValue += value.slice(nextStartingIndex, formatter.position);
  });
  originalValue += value.slice(originalValue.length + formattersApplied);

  return originalValue;
};

const capitalize = ({ value }: { value: string }): string => {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const gapsCreditCard = ({ value, formatterValue }: { value: string; formatterValue: string[] }): string | undefined => {
  if (!value) return;

  const [type, rawValue] = utils.creditCard.getTypeCard(value, formatterValue);
  return utils.creditCard.formatValue(rawValue, type);
};

const formatters: Record<string, unknown> = {
  splitter,
  undo_splitter,
  capitalize,
  gapsCreditCard,
};

const run = (value: any, componentFormatters: TSchemaFormatters, undo?: boolean): string | number => {
  let newValue = value;

  Object.keys(componentFormatters).forEach((key: string): void => {
    const formatterValue = (componentFormatters as Record<string, unknown>)[key];
    const formatterFn = formatters[undo ? `undo_${key}` : key];
    if (!formatterFn) return;

    newValue = (formatterFn as TFormatterFunction)({
      value: newValue,
      formatterValue,
    });
  });
  return newValue;
};

export { run };
