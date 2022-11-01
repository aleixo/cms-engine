import { TComponentMasks } from 'core/types';

type TMaskGeneric = {
  to: number;
  from: number;
  mask: string;
}[];

type TCurrencyMask = {
  locale: string;
  currency: string;
};

type TMaskFunction = (data: { value: string | number; maskValue: unknown }) => string;

const hideCardNumber = ({ value }: { value: string }) => {
  const maskValue: TMaskGeneric = [
    {
      from: 1,
      to: 4,
      mask: 'x',
    },
    {
      from: 6,
      to: 9,
      mask: 'x',
    },
    {
      from: 11,
      to: 14,
      mask: 'x',
    },
    {
      from: 16,
      to: 19,
      mask: 'x',
    },
  ];
  return generic({ value, maskValue });
};

const cardMask = ({ value }: { value: string }) => {
  return value
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

const cardDate = ({ value }: { value: string }) => {
  const fixedValue = value.replace(/\D/g, '');
  const valZeroTwo = fixedValue.slice(0, 2);

  return fixedValue.length >= 5
    ? `${valZeroTwo}/${fixedValue.slice(2, 4)}`
    : fixedValue.length >= 3
    ? `${valZeroTwo}/${fixedValue.slice(2)}`
    : fixedValue;
};

const feinMask = ({ value }: { value: string }) => {
  const fixedValue = value.replace(/\D/g, '');
  const valZeroTwo = fixedValue.slice(0, 2);

  return fixedValue.length >= 5
    ? `${valZeroTwo}-${fixedValue.slice(2, 9)}`
    : fixedValue.length >= 3
    ? `${valZeroTwo}-${fixedValue.slice(2)}`
    : fixedValue;
};

const currencyMask = ({ value = '', maskValue }: { value: string; maskValue: TCurrencyMask }) => {
  const replacedValue = value.replace(/[^0-9]/g, '');

  return new Intl.NumberFormat(maskValue.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'currency',
    currency: maskValue.currency,
  }).format(+replacedValue);
};

const cardNumber = ({ value }: { value: string }) => {
  const maskValue: TMaskGeneric = [
    {
      from: 1,
      to: 4,
      mask: 'x',
    },
    {
      from: 6,
      to: 9,
      mask: 'x',
    },
    {
      from: 11,
      to: 14,
      mask: 'x',
    },
    {
      from: 16,
      to: 19,
      mask: 'x',
    },
  ];
  return generic({ value, maskValue });
};

const generic = ({ value = '', maskValue }: { value: string; maskValue: TMaskGeneric }) => {
  let masked = value;

  maskValue.forEach((item) => {
    const { to = masked.length, mask } = item;
    let { from } = item;

    if (to > value.length - 1) return;
    if (from === 0) {
      from = 1;
    }

    const maskedPortion = new Array(to - from + 2).join(mask);
    masked = masked.slice(0, from - 1) + maskedPortion + masked.slice(to);
  });

  return masked;
};

type TReplaceProps = {
  value: string;
  maskValue: string | number;
};

const replaceAll = ({ value = '', maskValue }: TReplaceProps) => {
  let targetReplaceMask = maskValue;
  if (!targetReplaceMask || typeof value !== 'string') return value;

  if (typeof targetReplaceMask === 'number') {
    targetReplaceMask = targetReplaceMask?.toString();
  }
  return new Array(value.length + 1).join(targetReplaceMask);
};

const masks: Record<string, unknown> = {
  generic,
  cardNumber,
  hideCardNumber,
  cardMask,
  cardDate,
  currencyMask,
  feinMask,
  replaceAll,
};

const run = (value: any, componentMasks: TComponentMasks): string => {
  let newValue = value;

  Object.keys(componentMasks).forEach((key: string): void => {
    const maskValue = (componentMasks as Record<string, unknown>)[key];
    const formatterFn = masks[key];
    if (!formatterFn) return;

    newValue = (formatterFn as TMaskFunction)({
      value: newValue,
      maskValue,
    });
  });
  return newValue;
};

export { run };
