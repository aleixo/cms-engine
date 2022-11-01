import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './validations.docs.mdx';
export default {
  title: 'Form/Validations',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const schema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          children: [
            {
              component: 'input',
              name: 'a.email',
              errorMessages: {
                required: 'E-mail is mandatory',
                email: 'Must be a valid e-mail',
              },
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  email: true,
                },
              },
              props: {
                variants: 'default_border',
                placeholder: 'Please enter your email address',
                label: 'E-mail address',
              },
            },
            {
              component: 'input',
              name: 'b.password',
              errorMessages: {
                required: 'Password is required',
                minLength: 'Not a valid password',
              },
              masks: {
                ON_FIELD_BLUR: {
                  cleanMask: true,
                  replaceAll: '*',
                },
              },
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  minLength: 5,
                },
              },
              props: {
                variants: 'default_border',
                placeholder: 'Please enter your password',
                label: 'Password',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const Required: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form initialValues={{ change: 'ss', blur: '22' }} schema={schema} onData={console.log} />
    </FormProvider>
  );
};

export const Email: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={{
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
                      name: 'name',
                      props: {
                        name: 'change',
                        id: 'change',
                        label: 'On Change',
                      },
                      validations: {
                        ON_FIELD_CHANGE: {
                          email: true,
                        },
                      },
                      errorMessages: {
                        email: 'Invalid e-mail',
                      },
                    },
                    {
                      component: 'input',
                      name: 'blur',
                      props: {
                        name: 'blur',
                        id: 'blur',
                        label: 'On Blur ${fields.name.value}',
                      },
                      validations: {
                        ON_FIELD_BLUR: {
                          email: true,
                        },
                      },
                      errorMessages: {
                        default: 'Default error message ',
                        email: 'Invalid e-mail',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </FormProvider>
  );
};

export const Length: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            length: 4,
                          },
                        },
                        errorMessages: {
                          length: 'Must have length different of 4',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            length: 4,
                          },
                        },
                        errorMessages: {
                          length: 'Must have length different of 4',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const GreaterThan: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            greaterThan: 4,
                          },
                        },
                        errorMessages: {
                          greaterThan: 'Must be greater than 4',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            greaterThan: 4,
                          },
                        },
                        errorMessages: {
                          greaterThan: 'Must be greater than 4',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const NoExtraSpaces: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            hasNoExtraSpaces: true,
                          },
                        },
                        errorMessages: {
                          hasNoExtraSpaces: 'No extra spaces',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            hasNoExtraSpaces: true,
                          },
                        },
                        errorMessages: {
                          hasNoExtraSpaces: 'No extra spaces',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const IsCreditCard: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            isCreditCard: [
                              'visa',
                              'mastercard',
                              'american-express',
                              'diners-club',
                              'discover',
                              'jcb',
                              'unionpay',
                              'maestro',
                              'mir',
                              'elo',
                              'hiper',
                              'hipercard',
                            ],
                          },
                        },
                        errorMessages: {
                          isCreditCard: 'Must be a credit card',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            isCreditCard: [
                              'visa',
                              'mastercard',
                              'american-express',
                              'diners-club',
                              'discover',
                              'jcb',
                              'unionpay',
                              'maestro',
                              'mir',
                              'elo',
                              'hiper',
                              'hipercard',
                            ],
                          },
                        },
                        errorMessages: {
                          isCreditCard: 'Must be a credit card',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const IsCreditCardAndLength: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            isCreditCardAndLength: [
                              'visa',
                              'mastercard',
                              'american-express',
                              'diners-club',
                              'discover',
                              'jcb',
                              'unionpay',
                              'maestro',
                              'mir',
                              'elo',
                              'hiper',
                              'hipercard',
                            ],
                          },
                        },
                        errorMessages: {
                          isCreditCardAndLength: 'Must be a credit card with the correct length type',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            isCreditCardAndLength: [
                              'visa',
                              'mastercard',
                              'american-express',
                              'diners-club',
                              'discover',
                              'jcb',
                              'unionpay',
                              'maestro',
                              'mir',
                              'elo',
                              'hiper',
                              'hipercard',
                            ],
                          },
                        },
                        errorMessages: {
                          isCreditCardAndLength: 'Must be a credit card with the correct length type',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const IsNumber: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            isNumber: true,
                          },
                        },
                        errorMessages: {
                          isNumber: 'Must be a number',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            isNumber: true,
                          },
                        },
                        errorMessages: {
                          isNumber: 'Must be number',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const LessThan: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            isNumber: true,
                            lessThan: 3,
                          },
                        },
                        errorMessages: {
                          default: 'Must be a number',
                          lessThan: 'Must smaller than 3',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            isNumber: true,
                            lessThan: 3,
                          },
                        },
                        errorMessages: {
                          default: 'Must be a number',
                          lessThan: 'Must smaller than 3',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const NotAllowSpaces: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            notAllowSpaces: true,
                          },
                        },
                        errorMessages: {
                          notAllowSpaces: 'Spaces not allowed',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            notAllowSpaces: 3,
                          },
                        },
                        errorMessages: {
                          notAllowSpaces: 'Spaces not allowed',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const MaxLength: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            maxLength: 3,
                          },
                        },
                        errorMessages: {
                          maxLength: 'Must smaller than 3',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            maxLength: 3,
                          },
                        },
                        errorMessages: {
                          maxLength: 'Must smaller than 3',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const MinLength: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            minLength: 3,
                          },
                        },
                        errorMessages: {
                          minLength: 'Must be at least 3 characters long',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            minLength: 3,
                          },
                        },
                        errorMessages: {
                          minLength: 'Must be at least 3 characters long',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const NotEmpty: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            notEmpty: true,
                          },
                        },
                        errorMessages: {
                          notEmpty: 'No empty values',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            notEmpty: true,
                          },
                        },
                        errorMessages: {
                          maxLength: 'No empty values',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const NumericRange: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            isNumber: true,
                            numericRange: {
                              start: 1,
                              end: 2,
                            },
                          },
                        },
                        errorMessages: {
                          default: 'Must be number',
                          numericRange: 'Number must be between 1 and 10',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            isNumber: true,
                            numericRange: { start: 1, end: 2 },
                          },
                        },
                        errorMessages: {
                          default: 'Must be number',
                          numericRange: 'Number must be between 1 and 10',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const OnlyLetters: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            onlyLetters: true,
                          },
                        },
                        errorMessages: {
                          onlyLetters: 'Only letters',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            onlyLetters: true,
                          },
                        },
                        errorMessages: {
                          onlyLetters: 'Only letters',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const Regex: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            regex: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                          },
                        },
                        errorMessages: {
                          regex: 'Pattern must be 222-222-2222',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            regex: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                          },
                        },
                        errorMessages: {
                          regex: 'Pattern must be 222-222-2222',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const RepeatedNumbers: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            repeatedNumbers: true,
                          },
                        },
                        errorMessages: {
                          repeatedNumbers: 'You cant use repeated nums like 22222',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            repeatedNumbers: true,
                          },
                        },
                        errorMessages: {
                          repeatedNumbers: 'You cant use repeated nums like 22222',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const SequentialNumbers: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            sequentialNumber: true,
                          },
                        },
                        errorMessages: {
                          sequentialNumber: 'Numbers cant be sequential like 123',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            sequentialNumber: true,
                          },
                        },
                        errorMessages: {
                          sequentialNumber: 'Numbers cant be sequential like 123',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const Url: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            url: true,
                          },
                        },
                        errorMessages: {
                          url: 'Should be URL',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            url: true,
                          },
                        },
                        errorMessages: {
                          url: 'Should be URL',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const Value: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={
          {
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
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            value: 'form-engine',
                          },
                        },
                        errorMessages: {
                          value: 'Should be form-engine',
                        },
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        validations: {
                          ON_FIELD_BLUR: {
                            value: 'form-engine',
                          },
                        },
                        errorMessages: {
                          value: 'Should be form-engine',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          } as TSchema
        }
      />
    </FormProvider>
  );
};

export const isInTheList: Story = (): React.ReactElement => {
  return (
    <>
      <style>{`
      .with-margin div{
        margin-bottom: 30px;
      }
    `}</style>

      <div className="with-margin">
        <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
          <Form
            schema={
              {
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
                            name: 'notInTheList',
                            props: {
                              name: 'notInTheList',
                              id: 'notInTheList',
                              dataTestId: 'notInTheList',
                              label: 'On change',
                            },
                            validations: {
                              ON_FIELD_CHANGE: {
                                isInTheList: [1, 2, '3'],
                              },
                            },
                            errorMessages: {
                              isInTheList: 'Should be in [1, 2, 3]',
                            },
                          },
                          {
                            component: 'input',
                            name: 'notInTheList',
                            props: {
                              name: 'notInTheList',
                              id: 'notInTheList',
                              dataTestId: 'notInTheList',
                              label: 'On blur',
                            },
                            validations: {
                              ON_FIELD_BLUR: {
                                isInTheList: [1, 2, '3'],
                              },
                            },
                            errorMessages: {
                              isInTheList: 'Should be in [1, 2, 3]',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              } as unknown as TSchema
            }
          />
        </FormProvider>
      </div>
    </>
  );
};

export const isInTheListWithIVars: Story = (): React.ReactElement => {
  return (
    <>
      <style>{`
    .with-margin div{
      margin-bottom: 30px;
    }
  `}</style>

      <div className="with-margin">
        <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
          <Form
            schema={
              {
                iVars: {
                  list: [1, 2, '3'],
                },
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
                            name: 'notInTheList',
                            props: {
                              name: 'notInTheList',
                              id: 'notInTheList',
                              dataTestId: 'notInTheList',
                              label: 'On change',
                            },
                            validations: {
                              ON_FIELD_CHANGE: {
                                isInTheList: '${list}',
                              },
                            },
                            errorMessages: {
                              isInTheList: 'Should be in [1, 2, 3]',
                            },
                          },
                          {
                            component: 'input',
                            name: 'notInTheList',
                            props: {
                              name: 'notInTheList',
                              id: 'notInTheList',
                              dataTestId: 'notInTheList',
                              label: 'On blur',
                            },
                            validations: {
                              ON_FIELD_BLUR: {
                                isInTheList: '${list}',
                              },
                            },
                            errorMessages: {
                              isInTheList: 'Should be in [1, 2, 3]',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              } as unknown as TSchema
            }
          />
        </FormProvider>
      </div>
    </>
  );
};

const acceptedOptions: string[] = [
  'visa',
  'mastercard',
  'american-express',
  'diners-club',
  'discover',
  'jcb',
  'unionpay',
  'maestro',
  'mir',
  'elo',
  'hiper',
  'hipercard',
];

const creditSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          component: 'formGroup',
          name: 'containerGroup',
          props: {
            center: true,
            mb: 0.5,
          },
          children: [
            {
              component: 'input',
              name: 'numberCard',
              filter: {
                maxLength: 19,
                isNumber: true,
              },
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  isCreditCard: acceptedOptions,
                  isCreditCardAndLength: acceptedOptions,
                },
                ON_FIELD_CHANGE: {
                  required: true,
                  isCreditCard: acceptedOptions,
                },
              },
              errorMessages: {
                isCreditCard: 'Number Card Incorrect',
                isCreditCardAndLength: 'Number Card Length Incorrect',
              },
              rehydrate: {
                ON_FIELD_CHANGE: [
                  {
                    validations: {
                      isCreditCard: acceptedOptions,
                    },
                    fields: ['cvvInput'],
                  },
                ],
              },
              formatters: {
                ON_FIELD_CHANGE: {
                  gapsCreditCard: acceptedOptions,
                },
                ON_FIELD_BLUR: {
                  gapsCreditCard: acceptedOptions,
                },
              },
              props: {
                dataTestId: 'numberCard',
                name: 'numberCard',
                id: 'numberCard',
                label: 'Number Card',
                placeholder: 'Insert Number Card',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
                availableOptions: acceptedOptions,
              },
            },
          ],
        },
        {
          component: 'formGroup',
          name: 'containerGroup',
          props: {
            center: true,
            mb: 0.5,
          },
          children: [
            {
              component: 'input',
              name: 'cvvInput',
              validations: {
                ON_FIELD_BLUR: {
                  isCreditCodeMatch: {
                    numberCard: '${fields.numberCard.value}',
                    availableOptions: acceptedOptions,
                  },
                },
                ON_FIELD_CHANGE: {
                  isCreditCodeMatch: {
                    numberCard: '${fields.numberCard.value}',
                    availableOptions: acceptedOptions,
                  },
                },
              },
              errorMessages: {
                isCreditCodeMatch: 'Invalid Credit Code',
              },
              filter: {
                maxLength: 4,
              },
              props: {
                dataTestId: 'cvv',
                name: 'cvv',
                id: 'cvv',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
                label: '${fields.numberCard.errors.isCreditCard.metadata.creditCardCC||CVA}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const CreditCard: Story = (): React.ReactElement => {
  const [formData, setFormData] = useState({});
  return (
    <>
      <p>Based on Credit number will apply rules to Credit Code</p>
      <p>Card Types:</p>
      <ul>
        <li>visa</li>
        <li>mastercard</li>
        <li>american-express</li>
        <li>diners-club</li>
        <li>discover</li>
        <li>jcb</li>
        <li>unionpay</li>
        <li>maestro</li>
        <li>mir</li>
        <li>elo</li>
        <li>hiper</li>
        <li>hipercard</li>
      </ul>
      <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
        <Form schema={creditSchema} onData={(data) => setFormData(data)} />
        <div>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </FormProvider>
    </>
  );
};

const date = new Date();

const customValidationJSON = [
  {
    from: 0,
    to: 2,
    validations: {
      greaterThan: date.getMonth(),
      lessThan: '13',
    },
  },
  {
    from: 3,
    to: 5,
    validations: {
      greaterThan: (date.getFullYear().toString().slice(-2) as any) - 1,
    },
  },
];

const customValidationDateSchema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          component: 'formGroup',
          name: 'containerGroup',
          props: {
            center: true,
            mb: 0.5,
          },
          children: [
            {
              component: 'input',
              name: 'date',
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  customValidation: customValidationJSON,
                },
                ON_FIELD_CHANGE: {
                  regex: '^[0-9]{2}/[0-9]{2}$',
                  customValidation: customValidationJSON,
                },
              },
              filter: {
                maxLength: 5,
              },
              errorMessages: {
                regex: 'Invalid Date',
                required: 'Date is Required',
                customValidation: 'Custom Validation Error',
              },
              formatters: {
                ON_FIELD_CHANGE: {
                  capitalize: true,
                  splitter: [
                    {
                      position: 2,
                      value: '/',
                    },
                  ],
                },
              },
              props: {
                dataTestId: 'date',
                name: 'date',
                id: 'date',
                label: 'Date',
                placeholder: 'MM/YY',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const CustomValidations: Story = (): React.ReactElement => {
  return (
    <>
      <p>Based on specific position of string it will run validations that we specified.</p>
      <p>Example Rules: </p>
      <li>first 2 caracters</li>
      <p> - greaterThan: Valid for current month or after</p>
      <p> - lessThan: 12</p>

      <li>last 2 caracters</li>
      <p> - greaterThan: Valid for current year or after</p>

      <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
        <Form schema={customValidationDateSchema} />
      </FormProvider>
    </>
  );
};

const schemaDynamicValidations: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          children: [
            {
              component: 'input',
              name: 'minLengthValueField',
              props: {
                variants: 'default_border',
                placeholder: 'Input here below field min length',
                label: 'Input here below field min length',
              },
            },
            {
              component: 'input',
              name: 'target',
              errorMessages: {
                minLength: 'Min length not passed. Must be ${fields.minLengthValueField.value||2}',
              },
              validations: {
                ON_FIELD_BLUR: {
                  minLength: '${fields.minLengthValueField.value||2}' as unknown as number,
                },
              },
              props: {
                variants: 'default_border',
                label: 'Min validation equal to top field value and fired ON_BLUR',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const DynamicValidationsAndErrorMessages: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={schemaDynamicValidations} />
    </FormProvider>
  );
};
