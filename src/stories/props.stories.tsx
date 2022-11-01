import React, { useRef, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TFormRefActions, TSchema } from '../form';

export default {
  title: 'Form/Props',
  component: Form,
};
const schema: TSchema = {
  formattedDataDefaults: { firstName: 'firstName behind the scenes default' },
  components: [
    {
      component: '',
      name: 'step1',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            title: 'Step 1',
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'firstName',
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'First name is required',
                onlyLetters: 'First name should only contain letters and no spaces',
              },
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
                placeholder: 'Type your first name',
                autoComplete: 'nope',
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'Last name is required',
                onlyLetters: 'Last name should only contain letters and no spaces',
              },
              formatters: {
                ON_FIELD_CHANGE: {
                  capitalize: true,
                },
              },
              component: 'input',
              name: 'lastName',
              props: {
                dataTestId: 'lastName',
                name: 'lastName',
                id: 'lastName',
                label: 'Last name',
                placeholder: 'Type your last name',
                autoComplete: 'nope',
              },
            },
          ],
        },
      ],
    },
    {
      component: '',
      name: '',
      children: [
        {
          name: 'step3',
          component: 'formGroup',
          props: {
            title: 'Step 2',
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'firstName2',
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'First name is required',
                onlyLetters: 'First name should only contain letters and no spaces',
              },
              props: {
                dataTestId: 'firstName2',
                name: 'firstName2',
                id: 'firstName2',
                label: 'First name STEP 2',
                placeholder: 'Type your first name',
                autoComplete: 'nope',
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'Last name is required',
                onlyLetters: 'Last name should only contain letters and no spaces',
              },
              formatters: {
                ON_FIELD_CHANGE: {
                  capitalize: true,
                },
              },
              component: 'input',
              name: 'lastName2',
              props: {
                dataTestId: 'lastName2',
                name: 'lastName2',
                id: 'lastName2',
                label: 'Last name STEP 2',
                placeholder: 'Type your last name',
                autoComplete: 'nope',
              },
            },
          ],
        },
      ],
    },
    {
      component: '',
      name: '',
      children: [
        {
          name: 'step3',
          component: 'formGroup',
          props: {
            title: 'Step 3',
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'firstName3',
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'First name is required',
                onlyLetters: 'First name should only contain letters and no spaces',
              },
              props: {
                dataTestId: 'firstName3',
                name: 'firstName3',
                id: 'firstName3',
                label: 'First name STEP 3',
                placeholder: 'Type your first name',
                autoComplete: 'nope',
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                  onlyLetters: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'Last name is required',
                onlyLetters: 'Last name should only contain letters and no spaces',
              },
              formatters: {
                ON_FIELD_CHANGE: {
                  capitalize: true,
                },
              },
              component: 'input',
              name: 'lastName3',
              props: {
                dataTestId: 'lastName3',
                name: 'lastNam3',
                id: 'lastName3',
                label: 'Last name STEP 3',
                placeholder: 'Type your last name',
                autoComplete: 'nope',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const StepsNavigation: Story = (): React.ReactElement => {
  const ref = useRef<TFormRefActions>(null);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form initialValues={{ lastName: '2' }} onBlur={console.log} ref={ref} schema={schema} />
      <button
        onClick={() => {
          ref.current?.stepForward();
        }}
      >
        Navigate Forward
      </button>
      <button
        onClick={() => {
          ref.current?.stepBack();
        }}
      >
        Navigate back
      </button>
    </FormProvider>
  );
};

export const ForceValidation: Story = (): React.ReactElement => {
  const ref = useRef<TFormRefActions>(null);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form ref={ref} schema={schema} />
      <button
        onClick={() => {
          ref.current?.validateForm();
        }}
      >
        Run validations
      </button>
      <button
        onClick={() => {
          ref.current?.validateForm({ scopeBlurredChildren: true });
        }}
      >
        Validate blurred fields
      </button>
      <button
        onClick={() => {
          ref.current?.validateForm({ scopeChangedChildren: true });
        }}
      >
        Validate changed fields
      </button>
      <button
        onClick={async () => {
          const x = await ref.current?.validateForm({ childrenScope: ['lastName'] });
          console.log('x', x);
        }}
      >
        Validate only last name
      </button>
    </FormProvider>
  );
};

export const Submit: Story = (): React.ReactElement => {
  const ref = useRef<TFormRefActions>(null);
  const [submit, setSubmit] = useState(false);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        ref={ref}
        schema={schema}
        onSubmit={() => {
          setSubmit(true);
        }}
      />
      <button
        onClick={() => {
          ref.current?.submit();
        }}
      >
        Submit
      </button>
      {submit ? <p>SUBMITTED</p> : <></>}
    </FormProvider>
  );
};
