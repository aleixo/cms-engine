import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider } from '../form';
import Docs from './effects.docs.mdx';
export default {
  title: 'Form/VisibilityConditions',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const VisibilityConditions: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ roofUpdated: 'Yes', roofUpdatedYear: '2' }}
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
                    center: true,
                    mb: 0.5,
                  },
                  children: [
                    {
                      name: 'roofUpdated',
                      group: 'roofUpdatedOptions',
                      component: 'checkbox',
                      visibilityConditions: {
                        ON_FIELD_MOUNT: [
                          {
                            validations: {
                              value: 'Yes',
                            },
                            fieldNames: ['roofUpdatedYearGroup', 'roofUpdatedYear'],
                          },
                        ],
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: 'Yes',
                            },
                            fieldNames: ['roofUpdatedYearGroup', 'roofUpdatedYear'],
                          },
                        ],
                      },
                      props: {
                        id: 'roofUpdated',
                        dataTestId: 'roofUpdated',
                        checked: false,
                        label: 'Yes',
                        value: 'Yes',
                        variant: 'rounded',
                        size: 3,
                        padding: '14px 20px',
                        bgColor: '#ffffff',
                        updateBackground: true,
                      },
                    },
                    {
                      component: 'formGroup',
                      name: 'roofUpdatedYearGroup',
                      props: {
                        center: true,
                      },
                      state: { hidden: true },
                      children: [
                        {
                          validations: {
                            onBlur: {
                              required: true,
                            },
                          },
                          errorMessages: {
                            required: 'dassdsad ${global.icurrentYear}',
                          },
                          name: 'roofUpdatedYear',
                          component: 'input',
                          props: {
                            label: 'In what year?',
                            dataTestId: 'roofUpdatedYear',
                            placeholder: '0000',
                          },
                        },
                      ],
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
