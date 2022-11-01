import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema } from '../form';
import Docs from './templating.docs.mdx';
import { useState } from 'react';
import { useEffect } from 'react';

export default {
  title: 'Form/Templating',
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const Basic: Story = (): React.ReactElement => {
  const [iVars, setIVars] = useState({
    fooge: 'global stuff',
  });
  useEffect(() => {
    setTimeout(() => {
      setIVars({
        fooge: 'updated',
      });
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ template: 'ww' }}
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
                      component: 'input',
                      name: 'input',
                      props: {
                        name: 'input',
                        id: 'input',
                        label: 'Hello ${fields.template.errors.isCreditCard.metadata.creditCardCC}',
                        autoComplete: 'nope',
                        placeholder: 'BUSCART ',
                      },
                    },
                    {
                      validations: {
                        ON_FIELD_CHANGE: {
                          isCreditCard: ['visa', 'mastercard'],
                        },
                      },
                      component: 'creditNumberInput',
                      name: 'template',
                      props: {
                        name: 'template',
                        id: 'template',
                        label: 'What is your name',
                        autoComplete: 'nope',
                        typeCard: '${fields.template.errors.isCreditCard.metadata.typeCard}',
                      },
                    },
                    {
                      component: 'input',
                      name: 'abc',
                      props: {
                        name: 'abc',
                        id: 'abc',
                        label: 'Hello',
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

export const DefaultValue: Story = (): React.ReactElement => {
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
                      component: 'input',
                      name: 'template',
                      props: {
                        name: 'template',
                        id: 'template',
                        label: 'What is your name',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      component: 'input',
                      name: 'input',
                      props: {
                        name: 'input',
                        id: 'input',
                        label: 'Hello ${fields.template.value||NAME WILL APPEAR HERE}',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      name: 'make',
                      component: 'dropdown',
                      props: {
                        id: 'make',
                        name: 'make',
                        label: 'Make',
                        placeholder: '',
                        dataTestId: 'make',
                        autoComplete: 'nope',
                        backgroundColor: 'white',
                        options: '${api.makes.data||[]}',
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

export const NestedTemplating: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={{
          iVars: {
            name: {
              first: 'diogo',
              last: 'aleixo',
              middle: 'Manuel',
            },
            key: {
              middleName: {
                p: 'middle',
              },
            },
            foo: {
              bar: 'middleName',
            },
          },
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
                      component: 'h1',
                      name: 'heading',
                      props: {
                        name: 'heading',
                        id: 'heading',
                        value:
                          'Use ${key.${foo.bar}.${a||p}} to read from ivars. You inputed ${fields.templateWithIVars.value||nothing so far}',
                      },
                    },
                    {
                      component: 'input',
                      name: 'templateWithIVars',
                      props: {
                        dataTestId: 'templateWithIVars',
                        name: 'templateWithIVars',
                        id: 'templateWithIVars',
                        label: 'Hello ${global.name.first} ${global.name.last}. Insert stuff',
                        placeholder: 'Templates aninhados ${global.key.${global.foo.bar}.${global.a||p}}',
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

export const DynamicTemplating: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        schema={{
          iVars: {
            name: {
              first: 'diogo',
              last: 'aleixo',
              middle: 'Manuel',
            },
            key: {
              middleName: {
                p: 'middle',
              },
            },
            foo: {
              bar: 'middleName',
            },
          },
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
                      name: 'prop',
                      props: {
                        name: 'prop',
                        id: 'prop',
                        label: 'Choose prop to read from (first, last, middle) the iVarr name prop',
                        placeholder: 'prop',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      component: 'input',
                      name: 'destination',
                      props: {
                        name: 'destination',
                        id: 'destination',
                        label: 'Dynamic -> ${global.name.${fields.prop.value}}',
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

export const AutomaticTemplateUpdate: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        autoComplete="false"
        schema={{
          iVars: {
            foo: {
              bar: {
                baz: 'Ohhhh yea, nasty automated template nesting',
              },
            },
          },
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
                      name: 'prop',
                      props: {
                        name: 'prop',
                        id: 'prop',
                        label: 'NOTE: Input "baz" word',
                        placeholder: 'NOTE: Input "baz" word',
                      },
                    },
                    {
                      component: 'input',
                      name: 'simple',
                      props: {
                        name: 'simple',
                        id: 'simple',
                        label: 'Will not get updated since misses observables config',
                        placeholder: 'Simple Dynamic with default -> ${fields.prop.value||default it}',
                      },
                    },
                    {
                      component: 'input',
                      name: 'destination',
                      props: {
                        name: 'destination',
                        id: 'destination',
                        label: 'Complex Dynamic no default -> ${global.foo.bar.${fields.prop.value}}',
                        placeholder:
                          'Complex Dynamic with default -> ${global.foo.bar.${fields.prop.value}||default value}',
                      },
                    },
                    {
                      component: 'input',
                      name: 'modvalue',
                      props: {
                        name: 'modvalue',
                        id: 'modvalue',
                        label: 'Modify value',
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

const usingExcludeSchema: TSchema = {
  configs: {
    observables: {
      templates: {
        exclude: ['firstName', 'mydrop'],
      },
    },
  },
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
              name: 'firstName',
              props: {
                dataTestId: 'firstName',
                name: 'firstName',
                id: 'firstName',
                label: 'First name',
                placeholder: 'Type your first name ${global.someText}',
                autoComplete: 'nope',
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                },
              },
              errorMessages: {
                default: '${fields.firstName.value||DEFAULT}',
              },
              component: 'input',
              name: 'lastName',
              props: {
                dataTestId: 'lastName',
                name: 'lastName',
                id: 'lastName',
                label: '${fields.firstName.value||DEFAULT}',
                placeholder: 'On blur/change i will update my label with firstName input value',
                autoComplete: 'nope',
              },
            },
            {
              component: 'dropdown',
              name: 'mydrop',
              props: {
                dataTestId: 'mydrop',
                name: 'mydrop',
                id: 'mydrop',
                label: '${fields.firstName.value||DEFAULT}',
                placeholder: 'On blur/change i will update my label with firstName input value',
                autoComplete: 'nope',
                options: '${global.someOptions||[]}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const UsingExcludeOnObservablesTemplating: Story = (): React.ReactElement => {
  const [someOptions, setSomeOptions] = useState([{ id: 'defaultOption', selected: false, label: 'DEFAULT OPTION' }]);
  const [someText, setSomeText] = useState('DEFAULT TEXT');

  const handleClick = () => {
    setSomeOptions([
      { id: 'newOption1', selected: false, label: 'NEW OPT1' },
      { id: 'newOption2', selected: false, label: 'NEW OPT2' },
    ]);
    setSomeText('NEW TEXT');
  };

  return (
    <>
      <style>{`
      .with-margin div{
        margin-bottom: 30px;
      }
    `}</style>

      <div className="with-margin">
        <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
          <Form
            schema={usingExcludeSchema}
            iVars={{
              someOptions,
              someText,
            }}
          />
          <button id="observable-button" onClick={handleClick}>
            Toggle New Options
          </button>
        </FormProvider>
      </div>
    </>
  );
};

const notUsingExcludeSchema: TSchema = {
  configs: {
    observables: {
      templates: {
        exclude: [],
      },
    },
  },
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
              name: 'firstName',
              props: {
                dataTestId: 'firstName',
                name: 'firstName',
                id: 'firstName',
                label: 'First name',
                placeholder: 'Type your first name ${global.someText}',
                autoComplete: 'nope',
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                },
              },
              errorMessages: {
                default: 'Template error with ${fields.firstName.value||DEFAULT}',
              },
              component: 'input',
              name: 'lastName',
              props: {
                name: 'lastName',
                id: 'lastName',
                label: '${fields.firstName.value||DEFAULT}',
                placeholder: 'On blur/change i will update my label with firstName input value',
                autoComplete: 'nope',
              },
            },
            {
              component: 'dropdown',
              name: 'mydrop',
              props: {
                dataTestId: 'mydrop',
                name: 'mydrop',
                id: 'mydrop',
                label: '${fields.firstName.value||DEFAULT}',
                placeholder: 'On blur/change i will update my label with firstName input value',
                autoComplete: 'nope',
                options: '${global.someOptions||[]}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const NotUsingExcludeOnObservablesTemplating: Story = (): React.ReactElement => {
  const [someOptions, setSomeOptions] = useState([{ id: 'defaultOption', selected: false, label: 'DEFAULT OPTION' }]);
  const [someText, setSomeText] = useState('DEFAULT TEXT');

  const handleClick = () => {
    setSomeOptions([
      { id: 'newOption1', selected: false, label: 'NEW OPT1' },
      { id: 'newOption2', selected: false, label: 'NEW OPT2' },
    ]);
    setSomeText('NEW TEXT');
  };

  return (
    <>
      <style>{`
      .with-margin div{
        margin-bottom: 30px;
      }
    `}</style>

      <div className="with-margin">
        <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
          <Form
            schema={notUsingExcludeSchema}
            iVars={{
              someOptions,
              someText,
            }}
          />
          <button id="observable-button" onClick={handleClick}>
            Toggle New Options
          </button>
        </FormProvider>
      </div>
    </>
  );
};

const templatingOnDefaultSchema: TSchema = {
  configs: {
    observables: {
      templates: {
        exclude: [],
      },
    },
  },
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
              name: 'firstName',
              props: {
                dataTestId: 'firstName',
                name: 'firstName',
                id: 'firstName',
                label: 'First name',
                placeholder: 'none',
                autoComplete: 'nope',
              },
              api: {
                ON_FIELD_CHANGE: [
                  {
                    debounceTime: 1000,
                    method: 'POST',
                    url: 'https://jsonplaceholder.typicode.com/posts',
                    scope: 'posts',
                    body: {
                      title: '${fields.firstName.value}',
                      body: 'bar',
                      userId: 1,
                    },
                  },
                ],
              },
            },
            {
              validations: {
                ON_FIELD_BLUR: {
                  required: true,
                },
              },
              errorMessages: {
                default: 'Template error with ${fields.firstName.value||DEFAULT}',
              },
              component: 'input',
              name: 'lastName',
              props: {
                name: 'lastName',
                id: 'lastName',
                label: '${api.posts.title||global.someText}',
                autoComplete: 'nope',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const TemplatingOnDefault: Story = (): React.ReactElement => {
  return (
    <>
      <style>{`
      .with-margin div{
        margin-bottom: 30px;
      }
    `}</style>

      <div className="with-margin">
        <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
          <Form
            schema={templatingOnDefaultSchema}
            iVars={{
              someOptions: [{ id: 'defaultOption', selected: false, label: 'DEFAULT OPTION' }],
              someText: 'DEFAULT',
            }}
          />
        </FormProvider>
      </div>
    </>
  );
};

export const ForTranslations: Story = (): React.ReactElement => {
  const [iVars, setIVars] = useState({
    i18n: { templateLabel: 'Initial label string', abcLabel: 'Abc initial label string' },
  });
  useEffect(() => {
    setTimeout(() => {
      setIVars({
        i18n: {
          templateLabel: 'Just updated it',
          abcLabel: 'Just updated it (ABC)',
        },
      });
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ template: 'ww' }}
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
                      component: 'input',
                      name: 'template',
                      props: {
                        name: 'template',
                        id: 'template',
                        label: '${global.i18n.templateLabel}',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      component: 'input',
                      name: 'abc',
                      props: {
                        name: 'abc',
                        id: 'abc',
                        label: '${global.i18n.abcLabel}',
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

export const ForAdvancedTranslations: Story = (): React.ReactElement => {
  const [iVars, setIVars] = useState({
    i18n: { templateLabel: 'Initial label string', abcLabel: 'Abc initial label string' },
  });
  useEffect(() => {
    setTimeout(() => {
      setIVars({
        i18n: {
          templateLabel: 'Just updated it',
          abcLabel: 'Just updated it (ABC)',
        },
      });
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ template: 'ww' }}
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
                      component: 'input',
                      name: 'template',
                      props: {
                        name: 'template',
                        id: 'template',
                        label: '${global.i18n.templateLabel}',
                        autoComplete: 'nope',
                      },
                    },
                    {
                      component: 'input',
                      name: 'abc',
                      props: {
                        name: 'abc',
                        id: 'abc',
                        label: '${global.i18n.abcLabel}',
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
