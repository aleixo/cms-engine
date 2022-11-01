import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './effects.docs.mdx';
import { useState } from 'react';
export default {
  title: 'Form/Rehydrate',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const rehydrateSchema: TSchema = {
  iVars: {
    mydropOptions: {
      default: [
        {
          id: 'default1',
          label: 'Default 1',
          selected: false,
        },
        {
          id: 'default2',
          label: 'Default 2',
          selected: true,
        },
      ],
      id1: [
        {
          id: 'option-for-id1_1',
          label: 'Option for id1 1 Rehydrated',
        },
      ],
      id2: [
        {
          id: 'option-for-id2_1',
          label: 'Option for id2 1 Rehydrated',
        },
        {
          id: 'option-for-id2_2',
          label: 'Option for id2 2 Rehydrated',
          selected: true,
        },
      ],
      id3: [
        {
          id: 'option-for-id3_1',
          label: 'Option for id3 1 Rehydrated',
        },
        {
          id: 'option-for-id3_2',
          label: 'Option for id3 2 Rehydrated',
        },
      ],
    },
  },
  configs: {},
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
              rehydrate: {
                ON_FIELD_CHANGE: [
                  {
                    validations: {
                      required: true,
                    },
                    fields: ['mydropDestination'],
                  },
                ],
              },
              component: 'dropdown',
              name: 'mydrop',
              props: {
                name: 'mydrop',
                id: 'mydrop',
                label: 'Choose a value to affect next dropdown',
                options: [
                  {
                    id: 'id1',
                    label: 'Drop ID 1',
                    province: '231321321',
                    code: '321321321321',
                  },
                  {
                    id: 'id2',
                    label: 'Drop ID 2',
                    province: '231321321_______',
                    code: '321321321321------------',
                  },
                  {
                    id: 'id3',
                    label: 'Drop ID 3',
                    province: '231321321_____________',
                    code: '321321321321___________',
                  },
                ],
              },
            },
            {
              component: 'dropdown',
              name: 'mydropDestination',
              props: {
                name: 'mydropDestination',
                id: 'mydropDestination',
                label: 'Depends on previous selected option',
                options: '${global.mydropOptions.${fields.mydrop.value||default}}',
              },
            },
            {
              rehydrate: {
                ON_FIELD_CHANGE: [
                  {
                    validations: {
                      required: true,
                    },
                    fields: ['lastName'],
                  },
                  {
                    validations: {
                      required: true,
                    },
                    fields: ['phoneNumber'],
                  },
                ],
              },
              component: 'input',
              name: 'firstName',
              formatters: {
                ON_FIELD_CHANGE: {
                  capitalize: true,
                },
              },
              props: {
                dataTestId: 'firstName',
                name: 'firstName',
                id: 'firstName',
                label: 'First name',
                placeholder: 'Type your first name ${global.currentYear}',
                autoComplete: 'off',
              },
            },
            {
              validations: {
                onBlur: {
                  required: true,
                },
              },
              errorMessages: {
                required: 'dassdsad ${global.icurrentYear}',
              },
              component: 'input',
              name: 'lastName',
              props: {
                dataTestId: 'lastName',
                name: 'lastName',
                id: 'lastName',
                label: 'Last name ${fields.firstName.value||LABEL}',
                placeholder: '${fields.firstName.value||TESTE}',
                autoComplete: 'off',
              },
            },
            {
              validations: {
                onChange: {
                  required: true,
                },
              },
              errorMessages: {
                required: 'dassdsad ${global.icurrentYear}',
              },
              component: 'input',
              name: 'phoneNumber',
              props: {
                dataTestId: 'phoneNumber',
                name: 'phoneNumber',
                id: 'phoneNumber',
                label: 'Phone number ${fields.mydrop.metadata.code||LABEL}',
                placeholder: '${fields.mydrop.metadata.province||defaultvalue}',
                autoComplete: 'off',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const RehydrateFields: Story = (): React.ReactElement => {
  const [formData, setFormData] = useState({});
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form autoComplete="off" schema={rehydrateSchema} onData={console.log} iVars={{ icurrentYear: 7777 }} id="test" />
      <div>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </FormProvider>
  );
};
