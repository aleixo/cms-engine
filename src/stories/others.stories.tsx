import React, { useEffect } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import { useState } from 'react';

export default {
  title: 'Form/Others',
  component: Form,
};

const groups: TSchema = {
  validations: {
    path: {
      required: true,
      path: 'roofUpdatedOptions',
    },
  },
  filteredFields: ['roofUpdatedOptions'],
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
              props: {
                id: 'roofUpdated',
                dataTestId: 'roofUpdated',
                checked: false,
                label: 'Yes',
                variant: 'rounded',
                size: 3,
                value: 'Yes',
                padding: '14px 20px',
                bgColor: '#ffffff',
                updateBackground: true,
              },
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
                dataTestId: 'roofNoUpdated',
                checked: false,
                label: 'No',
                value: 'No',
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
};

export const Groups: Story = (): React.ReactElement => {
  const [schema, setSchema] = useState();
  const [groupValue, setGroupValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setSchema(groups);
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ roofUpdatedOptions: 'Yes' }}
        schema={schema}
        onData={(data) => {
          setGroupValue(data.formatted.roofUpdatedOptions as string);
        }}
      />
      <h2>Group selected value:</h2>
      <h3>{groupValue}</h3>
    </FormProvider>
  );
};
export const AsyncSchema: Story = (): React.ReactElement => {
  const [schema, setSchema] = useState();
  const [groupValue, setGroupValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setSchema(groups);
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        renderLoading={() => <p>Loading schema in 3 secs</p>}
        initialValues={{ roofUpdatedOptions: 'Yes' }}
        schema={schema}
        onData={(data) => {
          setGroupValue(data.formatted.roofUpdatedOptions as string);
        }}
      />
      <h2>Group selected value:</h2>
      <h3>{groupValue}</h3>
    </FormProvider>
  );
};
