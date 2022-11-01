import Input from '@bit/bolttech.components.ui.input'
import Checkbox from '@bit/bolttech.components.ui.checkbox';
import FormGroup from '@bit/bolttech.components.common.form-group';
import Dropdown from '@bit/bolttech.components.ui.dropdown';
import CreditNumberInput from '@bit/bolttech.components.common.credit-number-input';
import SwitchGroup from '@bit/bolttech.components.ui.switch-group';

const mappings = {
  creditNumberInput: { component: CreditNumberInput, label: 'Credit Number Input' },
  input: {
    component: Input,
    label: 'Input',
  },
  checkbox: { component: Checkbox, label: 'Checkbox' },
  formGroup: { component: FormGroup, label: 'Form Group', isContainer: true },
  dropdown: { component: Dropdown, label: 'Dropdown' },
  switchGroup: { component: SwitchGroup, label: 'Switch group' },
};


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
  switchGroup: {
    getValue: 'onChange',
    setValue: 'value',
  },
};

const examples = {
  formGroup: {
    title: 'Title test'
  },
  checkbox: {
    label: "example label"
  },
  dropdown: {
    label: 'Example label',
    placeholder:
      'example placeholder',
    options: [{
      id: 'example1',
      label: 'example1'
    }, {
      id: 'example2',
      label: 'example2'
    }],
    useFilter: true,
  },
  switchGroup: {
    options: [
      {
        value: 'example1',
        label: 'example1',
        selected: true,
      },
      {
        value: 'example2',
        label: 'example1',
      },
      {
        value: 'example3',
        label: 'example1',
      },
    ],
  }
}

const props = {
  dropdown: {
    label: {
      type: 'string'
    },
    placeholder:
    {
      type: 'string'
    },

    useFilter: {
      type: 'boolean'
    },
  },
  switchGroup: {},
  checkbox: {
    label: {
      type: 'string'
    }
  },
  input: {
    label: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    variants: {
      type: 'string',
    },
  },
  formGroup: {
    title: {
      type: 'string',
    },
    fullWidth: {
      type: 'boolean'
    },
    horizontal: {
      type: 'boolean'
    }
  }
};

export { mappings, formBuilderPropsMapping, props, examples };
