import React, { useEffect, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Form, FormProvider, useForm, TSchema } from '../form';
import { formBuilderPropsMapping, FormCheckbox, FormInput, Mappings } from './mappings/bolttech';

export default {
  title: 'Form/Jsx',
  component: Form,
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
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'connectedInput',
              name: 'name',
              props: {
                name: 'change',
                id: 'change',
                label: 'On Change',
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
            },
          ],
        },
      ],
    },
  ],
};

export const ConnectedInputInsideSchema: Story = (): React.ReactElement => {
  const { submitForm } = useForm({
    onData: (data) => {
      console.log('--->', data);
    },
    onSubmit: () => {
      console.log('SUBMIT');
    },
  });
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={schema} />
      <FormInput
        maxLength={19}
        name="cardNumber"
        placeholder="0000 0000 0000 0000"
        filter={{ maxLength: 16 }}
        masks={{
          ON_FIELD_BLUR: {
            generic: [
              {
                from: 0,
                to: 4,
                mask: 'x',
              },
              {
                from: 6,
                to: 9,
                mask: 'x',
              },
              {
                from: 11,
                to: 14,
                mask: 'x',
              },
            ],
          },
          ON_FIELD_FOCUS: {
            cleanMask: true,
          },
        }}
        formatters={{
          ON_FIELD_CHANGE: {
            splitter: [
              {
                position: 4,
                value: ' ',
              },
              {
                position: 9,
                value: ' ',
              },
              {
                position: 14,
                value: ' ',
              },
              {
                position: 19,
                value: ' ',
              },
            ],
          },
        }}
      />
      <button onClick={submitForm}>SUBMIT</button>
    </FormProvider>
  );
};

export const ConnectedValidations: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormInput
        filter={{ maxLength: 10 }}
        masks={{
          ON_FIELD_FOCUS: { cleanMask: true },
          ON_FIELD_BLUR: {
            generic: [
              {
                from: 1,
                to: 2,
                mask: 'X',
              },
              {
                from: 4,
                to: 5,
                mask: 'X',
              },
            ],
          },
        }}
        formatters={{
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
        }}
        name="ss"
        validations={{
          ON_FIELD_BLUR: {
            callback: (data) => {
              return {
                fail: data === '10/10/1000',
              };
            },
          },
        }}
        errorMessages={{ default: 'ERRRO' }}
      />
    </FormProvider>
  );
};

export const CustomValue: Story = (): React.ReactElement => {
  const [value, setValue] = useState('initial value');
  useEffect(() => {
    setTimeout(() => {
      setValue('My updatedvalue');
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormInput value={value} name="ss" />
    </FormProvider>
  );
};

export const InitialyVisibility: Story = (): React.ReactElement => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1500);
  }, []);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormCheckbox
        disabled={false}
        checked={!!visible}
        id="field_visibility"
        name="field_visibility"
        label="Visibility Example"
        onChange={() => setVisible(!visible)}
      />
      <FormInput visibility={visible} value="visible now" name="ss2" variants="bg-grey" />
    </FormProvider>
  );
};

export const AddingRemovingField: Story = (): React.ReactElement => {
  const [rows, setRows] = useState(1);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <>
        {Array.from({ length: rows }).map((_el, idx) => (
          <FormInput
            key={idx}
            variants="bg-grey"
            formId="ADD_RM_FIELD"
            label="Field example"
            name={`field.${idx}.asd`}
            validations={{ ON_FIELD_BLUR: { required: true } }}
            errorMessages={{ required: 'This field is required' }}
          />
        ))}

        <button onClick={() => setRows(rows - 1)}>Delete row</button>
        <button onClick={() => setRows(rows + 1)}>Add new row</button>
      </>
    </FormProvider>
  );
};
