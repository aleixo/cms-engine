import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './filters.docs.mdx';
export default {
  title: 'Form/Filters',
  parameters: {
    docs: {
      page: Docs,
    },
  },
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
                        filter: {
                          length: 4,
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
                        filter: {
                          hasNoExtraSpaces: true,
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
                        filter: {
                          isNumber: true,
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
                        filter: {
                          isNumber: true,
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
                        filter: {
                          isNumber: true,
                          lessThan: 3,
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
                        filter: {
                          isNumber: true,
                          lessThan: 3,
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
                        filter: {
                          notAllowSpaces: true,
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
                        filter: {
                          notAllowSpaces: 3,
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
                        filter: {
                          maxLength: 3,
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
                        filter: {
                          maxLength: 3,
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
                        filter: {
                          isNumber: true,
                          numericRange: {
                            start: 1,
                            end: 10,
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
                        filter: {
                          isNumber: true,
                          numericRange: { start: 1, end: 10 },
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
                        filter: {
                          onlyLetters: true,
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
                        filter: {
                          onlyLetters: true,
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
                        filter: {
                          repeatedNumbers: true,
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
                        filter: {
                          repeatedNumbers: true,
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
