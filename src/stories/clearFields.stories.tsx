import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider } from '../form';
import Docs from './effects.docs.mdx';
export default {
  title: 'Form/ClearFields',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const ClearFields: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        onLog={console.log}
        schema={{
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
                      name: 'roofUpdated',
                      group: 'roofUpdatedOptions',
                      clearFields: {
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: 'Yes',
                            },
                            fields: ['roofNoUpdated'],
                            clearedValue: false,
                          },
                        ],
                      },
                      component: 'checkbox',
                      visibilityConditions: {
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: 'Yes',
                            },
                            fieldName: 'roofUpdatedYearGroup',
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
                          name: 'roofUpdatedYear',
                          component: 'input',

                          filter: {
                            maxLength: 4,
                          },
                          errorMessages: {
                            required: 'Roof updated year is required',
                            isNumber: 'Year must be a number',
                            numericRange: 'The date must be between 1900 and ${global.currentYear}',
                          },
                          props: {
                            label: 'In what year?',
                            value: 'true',
                            dataTestId: 'roofUpdatedYear',
                            placeholder: '0000',
                            type: 'number',
                          },
                        },
                      ],
                    },
                    {
                      name: 'roofNoUpdated',
                      group: 'roofUpdatedOptions',
                      clearFields: {
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: 'No',
                            },
                            fields: ['roofUpdated'],
                            clearedValue: false,
                          },
                        ],
                      },
                      component: 'checkbox',
                      props: {
                        id: 'roofNoUpdated',
                        checked: false,
                        value: 'No',
                        label: 'No',
                        variant: 'rounded',
                        size: 3,
                        padding: '14px 20px',
                        bgColor: '#ffffff',
                        updateBackground: true,
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
