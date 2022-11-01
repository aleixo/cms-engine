"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;
const hideCardNumber = ({
  value
}) => {
  const maskValue = [{
    from: 1,
    to: 4,
    mask: 'x'
  }, {
    from: 6,
    to: 9,
    mask: 'x'
  }, {
    from: 11,
    to: 14,
    mask: 'x'
  }, {
    from: 16,
    to: 19,
    mask: 'x'
  }];
  return generic({
    value,
    maskValue
  });
};
const cardMask = ({
  value
}) => {
  return value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};
const cardDate = ({
  value
}) => {
  const fixedValue = value.replace(/\D/g, '');
  const valZeroTwo = fixedValue.slice(0, 2);
  return fixedValue.length >= 5 ? `${valZeroTwo}/${fixedValue.slice(2, 4)}` : fixedValue.length >= 3 ? `${valZeroTwo}/${fixedValue.slice(2)}` : fixedValue;
};
const feinMask = ({
  value
}) => {
  const fixedValue = value.replace(/\D/g, '');
  const valZeroTwo = fixedValue.slice(0, 2);
  return fixedValue.length >= 5 ? `${valZeroTwo}-${fixedValue.slice(2, 9)}` : fixedValue.length >= 3 ? `${valZeroTwo}-${fixedValue.slice(2)}` : fixedValue;
};
const currencyMask = ({
  value = '',
  maskValue
}) => {
  const replacedValue = value.replace(/[^0-9]/g, '');
  return new Intl.NumberFormat(maskValue.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'currency',
    currency: maskValue.currency
  }).format(+replacedValue);
};
const cardNumber = ({
  value
}) => {
  const maskValue = [{
    from: 1,
    to: 4,
    mask: 'x'
  }, {
    from: 6,
    to: 9,
    mask: 'x'
  }, {
    from: 11,
    to: 14,
    mask: 'x'
  }, {
    from: 16,
    to: 19,
    mask: 'x'
  }];
  return generic({
    value,
    maskValue
  });
};
const generic = ({
  value = '',
  maskValue
}) => {
  let masked = value;
  maskValue.forEach(item => {
    const {
      to = masked.length,
      mask
    } = item;
    let {
      from
    } = item;
    if (to > value.length - 1) return;
    if (from === 0) {
      from = 1;
    }
    const maskedPortion = new Array(to - from + 2).join(mask);
    masked = masked.slice(0, from - 1) + maskedPortion + masked.slice(to);
  });
  return masked;
};
const replaceAll = ({
  value = '',
  maskValue
}) => {
  let targetReplaceMask = maskValue;
  if (!targetReplaceMask || typeof value !== 'string') return value;
  if (typeof targetReplaceMask === 'number') {
    targetReplaceMask = targetReplaceMask === null || targetReplaceMask === void 0 ? void 0 : targetReplaceMask.toString();
  }
  return new Array(value.length + 1).join(targetReplaceMask);
};
const masks = {
  generic,
  cardNumber,
  hideCardNumber,
  cardMask,
  cardDate,
  currencyMask,
  feinMask,
  replaceAll
};
const run = (value, componentMasks) => {
  let newValue = value;
  Object.keys(componentMasks).forEach(key => {
    const maskValue = componentMasks[key];
    const formatterFn = masks[key];
    if (!formatterFn) return;
    newValue = formatterFn({
      value: newValue,
      maskValue
    });
  });
  return newValue;
};
exports.run = run;