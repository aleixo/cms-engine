import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './formatters.docs.mdx';
export default {
  title: 'Form/Formatters',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const Capitalize: Story = (): React.ReactElement => {
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
                        formatters: {
                          ON_FIELD_CHANGE: {
                            capitalize: true,
                          },
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
                        formatters: {
                          ON_FIELD_BLUR: {
                            capitalize: true,
                          },
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

export const GapsCreditCard: Story = (): React.ReactElement => {
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
                        formatters: {
                          ON_FIELD_CHANGE: {
                            gapsCreditCard: [
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
                      },
                      {
                        component: 'input',
                        name: 'blur',
                        props: {
                          name: 'blur',
                          id: 'blur',
                          label: 'On Blur',
                        },
                        formatters: {
                          ON_FIELD_BLUR: {
                            gapsCreditCard: [
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

export const GenericSplitter: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ name2: '1111' }}
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
                        name: 'name2',
                        props: {
                          name: 'name2',
                          id: 'name2',
                          label: 'On Mount & on change',
                        },
                        filter: { isNumber: true, maxLength: 8 },
                        formatters: {
                          ON_FIELD_MOUNT: {
                            splitter: [
                              {
                                position: 2,
                                value: '/',
                              },
                              {
                                position: 5,
                                value: '/',
                              },
                            ],
                          },
                          ON_FIELD_CHANGE: {
                            splitter: [
                              {
                                position: 2,
                                value: '/',
                              },
                              {
                                position: 5,
                                value: '/',
                              },
                            ],
                          },
                        },
                      },
                      {
                        component: 'input',
                        name: 'name',
                        props: {
                          name: 'change',
                          id: 'change',
                          label: 'On Change',
                        },
                        filter: { isNumber: true, maxLength: 8 },
                        formatters: {
                          ON_FIELD_CHANGE: {
                            splitter: [
                              {
                                position: 2,
                                value: '/',
                              },
                              {
                                position: 5,
                                value: '/',
                              },
                            ],
                          },
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
                        formatters: {
                          ON_FIELD_BLUR: {
                            splitter: [
                              {
                                position: 2,
                                value: '/',
                              },
                              {
                                position: 5,
                                value: '/',
                              },
                            ],
                          },
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
