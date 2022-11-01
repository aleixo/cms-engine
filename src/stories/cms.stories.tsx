import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { FormProvider, Page } from '../form';

export default {
  title: 'CMS',
};

export const OnBlur: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Page
        schema={[
          {
            component: 'p',
            name: '',
            props: {
              value: 'nope',
            },
          },
          {
            component: '__FORM__CONTAINER__',
            name: 'sss',
            children: [
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
                        name: 'firstName',
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
                        component: 'input',
                        name: 'chuckJoke',
                        props: {
                          dataTestId: 'chuckJoke',
                          name: 'chuckJoke',
                          id: 'chuckJoke',
                          label: 'On blur chuck joke',
                          placeholder: 'Type your last name',
                          autoComplete: 'nope',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            component: 'p',
            name: '',
            props: {
              value: 'nope',
            },
          },
          {
            component: 'p',
            name: '',
            props: {
              value: 'nope',
            },
          },
        ]}
      />
    </FormProvider>
  );
};
