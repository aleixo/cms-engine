import Input from '@bit/bolttech.components.ui.input';
import Checkbox from '@bit/bolttech.components.ui.checkbox';
import FormGroup from '@bit/bolttech.components.common.form-group';
import Dropdown from '@bit/bolttech.components.ui.dropdown';
import P from './P';
import H1 from './H1';
import { asFormField } from '../../form';
import CreditNumberInput from '@bit/bolttech.components.common.credit-number-input';
import CvvInput from '@bit/bolttech.components.common.cvv-input';

const formBuilderPropsMapping = {
  cvvInput: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  creditNumberInput: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  h1: {
    setValue: 'value',
  },
  p: {
    setValue: 'value',
  },
  input: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  checkbox: {
    getValue: 'onChange',
    setValue: 'checked',
  },
  dropdown: {
    getValue: 'onSelect',
    setValue: 'value',
  },
};

const FormInput = asFormField<React.ComponentProps<typeof Input>>({
  Comp: Input,
  propsMapping: formBuilderPropsMapping.input,
});

const FormCheckbox = asFormField<React.ComponentProps<typeof Checkbox>>({
  Comp: Checkbox,
  propsMapping: formBuilderPropsMapping.checkbox,
});

const Mappings = {
  cvvInput: { component: CvvInput },
  creditNumberInput: { component: CreditNumberInput },
  p: { component: P },
  h1: { component: H1 },
  input: { component: Input },
  checkbox: { component: Checkbox },
  formGroup: { component: FormGroup },
  dropdown: { component: Dropdown },
  connectedInput: { component: FormInput },
};

export { Mappings, formBuilderPropsMapping, FormInput, FormCheckbox };
