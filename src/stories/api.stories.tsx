import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider } from '../form';

import Docs from './api.docs.mdx';
export default {
  title: 'Form/API Calls',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};
const F = () => {
  const [iVars, setIVars] = useState({ random: 'random' });
  return (
    <Form
      onFormMount={() => console.log('FORM MOUNT')}
      onFieldMount={console.log}
      onData={() => setIVars({ random: 'aaaaaa' })}
      initialValues={{ chuckJoke: 's', firstName: 'sss' }}
      iVars={iVars}
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
                    api: {
                      ON_FIELD_MOUNT: [
                        {
                          blockRequestWhenInvalid: true,
                          method: 'GET',
                          url: 'https://api.chucknorris.io/jokes/${global.random}',
                          debounceTime: 1000,
                          scope: 'chuck',
                        },
                      ],
                    },
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
                      label: 'On blur chuck joke ${api.chuck.loading} ${api.chuck.value||d}',
                      placeholder: 'Type your last name ${api.chuck.value||d}',
                      autoComplete: 'nope',
                      value: '${api.chuck.value||global.random}',
                    },
                  },
                ],
              },
            ],
          },
        ],
      }}
    />
  );
};
export const OnMount: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <F />
    </FormProvider>
  );
};

export const OnBlur: Story = (): React.ReactElement => {
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
                      api: {
                        ON_FIELD_BLUR: [
                          {
                            method: 'GET',
                            url: 'https://api.chucknorris.io/jokes/random',
                            scope: 'chuck',
                          },
                        ],
                      },
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
                        value: '${api.chuck.value}',
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

export const OnChange: Story = (): React.ReactElement => {
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
                      api: {
                        ON_FIELD_CHANGE: [
                          { method: 'GET', url: 'https://api.chucknorris.io/jokes/random', scope: 'chuck' },
                        ],
                      },
                      component: 'dropdown',
                      name: 'firstName',
                      props: {
                        options: [
                          { id: '2', label: '2' },
                          { id: '3', label: '4' },
                        ],
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
                        label: 'On change chuck joke',
                        placeholder: 'Type your last name',
                        autoComplete: 'nope',
                        value: '${api.chuck.value}',
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

export const WithQueryString: Story = (): React.ReactElement => {
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
                      api: {
                        ON_FIELD_BLUR: [
                          {
                            method: 'GET',
                            url: 'https://api.chucknorris.io/jokes/random?category=${fields.jokesCategorieCall.value}',
                            scope: 'chuck',
                          },
                        ],
                      },
                      component: 'input',
                      name: 'jokesCategorieCall',
                      props: {
                        dataTestId: 'jokesCategorieCall',
                        name: 'jokesCategorieCall',
                        id: 'jokesCategorieCall',
                        label: 'Type chuck Norries Category',
                        placeholder: 'Type your last name',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      component: 'input',
                      name: 'jokeWithCategory',
                      props: {
                        dataTestId: 'jokeWithCategory',
                        name: 'jokeWithCategory',
                        id: 'jokeWithCategory',
                        label: 'Chuck jokes categories',
                        placeholder: 'Type your last name',
                        autoComplete: 'nope',
                        value: '${api.chuck.value}',
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

export const CustomBodyPOST: Story = (): React.ReactElement => {
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
                      api: {
                        ON_FIELD_BLUR: [
                          {
                            method: 'POST',
                            url: 'https://jsonplaceholder.typicode.com/posts',
                            scope: 'posts',
                            body: {
                              title: '${fields.bodyField.value}',
                              body: 'bar',
                              userId: 1,
                            },
                          },
                        ],
                      },
                      component: 'input',
                      name: 'bodyField',
                      props: {
                        name: 'bodyField',
                        id: 'bodyField',
                        label: 'Type something that will appear in the api body call on blur',
                        placeholder: 'Type something that will appear in the api body call on blur',
                        autoComplete: 'nope',
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

export const UpdateSpecificProp: Story = (): React.ReactElement => {
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
                      api: {
                        ON_FIELD_CHANGE: [
                          {
                            method: 'GET',
                            url: 'https://api.chucknorris.io/jokes/random',
                            scope: 'chuck',
                          },
                        ],
                      },
                      component: 'input',
                      name: 'updatePred',
                      props: {
                        name: 'updatePred',
                        id: 'updatePred',
                        label: 'Type make call and appear the result on other field label',
                      },
                    },
                    {
                      component: 'input',
                      name: 'target',
                      props: {
                        label: '${api.chuck.value}',
                        placeholder: 'Will appear api result in this field label after top input',
                        autoComplete: 'nope',
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

export const AvoidRequestOnNotValidField: Story = (): React.ReactElement => {
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
                    mb: 10,
                  },
                  children: [
                    {
                      validations: {
                        onChange: {
                          onlyLetters: true,
                        },
                      },
                      errorMessages: {
                        onlyLetters: 'Only letters',
                      },
                      api: {
                        ON_FIELD_CHANGE: [
                          {
                            blockRequestWhenInvalid: true,
                            method: 'GET',
                            url: 'https://api.chucknorris.io/jokes/random',
                            scope: 'chuck',
                          },
                        ],
                      },
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
                      name: 'space',
                      props: {
                        dataTestId: 'space',
                        name: 'space',
                        id: 'space',
                        label: 'just space',
                        placeholder: 'Type your last name',
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
                        label: 'On change chuck joke',
                        placeholder: 'Type your last name',
                        autoComplete: 'nope',
                        value: '${api.chuck.value}',
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
