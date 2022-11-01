import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './masks.docs.mdx';

export default {
  title: 'Form/Masks',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const genericMaskSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'DOB',
              props: {
                name: 'DOB',
                id: 'DOB',
                label: 'Date of birthday',
                autoComplete: 'nope',
                placeholder: 'MM/DD/YYYY',
              },
              masks: {
                ON_FIELD_BLUR: {
                  cleanMask: true,
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export const generic: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form initialValues={{ DOB: '22222' }} schema={genericMaskSchema} />
    </FormProvider>
  );
};

const cardNumberSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'cardNumber',
              props: {
                name: 'cardNumber',
                id: 'cardNumber',
                label: 'Card number',
                placeholder: '0000 0000 0000 0000',
                autoComplete: 'nope',
              },
              filter: { maxLength: 19 },
              masks: {
                ON_FIELD_CHANGE: {
                  cleanMask: true,
                  cardMask: true,
                },
              },
              validations: {
                ON_FIELD_CHANGE: {
                  required: true,
                },
              },
              errorMessages: {
                required: 'This field is required',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const cardNumber: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={cardNumberSchema} />
    </FormProvider>
  );
};

const hideCardNumberSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'hideCardNumber',
              props: {
                name: 'hideCardNumber',
                id: 'hideCardNumber',
                label: 'Hide Card number',
                placeholder: '0000 0000 0000 0000',
                autoComplete: 'nope',
              },
              filter: { maxLength: 19 },
              masks: {
                ON_FIELD_BLUR: {
                  cleanMask: true,
                  hideCardNumber: true,
                },
                ON_FIELD_CHANGE: {
                  cardMask: true,
                },
              },
              validations: {
                ON_FIELD_CHANGE: {
                  required: true,
                },
              },
              errorMessages: {
                required: 'This field is required',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const hideCardNumber: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={hideCardNumberSchema} />
    </FormProvider>
  );
};

const cardExpirationSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'cardExpiration',
              props: {
                name: 'cardExpiration',
                id: 'cardExpiration',
                label: 'Card expiration',
                placeholder: 'MM/YY',
                autoComplete: 'nope',
              },
              masks: {
                ON_FIELD_CHANGE: {
                  cleanMask: false,
                  cardDate: true,
                },
              },
              validations: {
                ON_FIELD_CHANGE: {
                  required: true,
                  regex: '^(0[1-9]|1[0-2])[/]?([0-9]{2})$',
                },
              },
              errorMessages: {
                required: 'This field is required',
                regex: 'Invalid expiration date',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const cardExpiration: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={cardExpirationSchema} />
    </FormProvider>
  );
};

const currencyMaskSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'totalPayroll',
              props: {
                name: 'totalPayroll',
                id: 'totalPayroll',
                label: 'Total payroll',
                autoComplete: 'nope',
                placeholder: '$0,00',
              },
              masks: {
                ON_FIELD_CHANGE: {
                  cleanMask: false,
                  currencyMask: {
                    locale: 'en-US',
                    currency: 'USD',
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export const currency: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={currencyMaskSchema} />
    </FormProvider>
  );
};

const feinMaskSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'fein',
              props: {
                name: 'fein',
                id: 'fein',
                label: 'Federal Employer Identification Number',
                autoComplete: 'nope',
                placeholder: 'XX-XXXXXXX',
              },
              masks: {
                ON_FIELD_CHANGE: {
                  feinMask: true,
                },
              },
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  sequentialNumber: true,
                  repeatedNumbers: true,
                  regex: '[0-9]{2}-[0-9]{7}',
                },
              },
              errorMessages: {
                regex: 'Federal Employer Identification must have 10 digits',
                required: 'Federal Employer Identification Number is required',
                sequentialNumber: 'Federal Employer Identification can not be sequential',
                repeatedNumbers: 'Federal Employer Identification can not be repeated numbers',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const fein: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={feinMaskSchema} />
    </FormProvider>
  );
};

const replaceMaskSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'fein',
              props: {
                name: 'fein',
                id: 'fein',
                label: 'Federal Employer Identification Number',
                autoComplete: 'nope',
                placeholder: 'XX-XXXXXXX',
              },
              masks: {
                ON_FIELD_BLUR: {
                  cleanMask: true,
                  replaceAll: '*',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export const maskReplace: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={replaceMaskSchema} />
    </FormProvider>
  );
};
