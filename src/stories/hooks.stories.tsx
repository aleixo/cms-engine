import React, { useCallback, useMemo, useRef } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TSchema, TFormRefActions, TAvailableHooks } from '../form';

export default {
  title: 'Form/Hooks',
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
              component: 'dropdown',
              name: 'dropdown',
              props: {
                name: 'dropdown',
                id: 'dropdown',
                label: 'Dropdown',
                autoComplete: 'nope',
                backgroundColor: 'grey',
                options: '${hooks.dropdownOptions||[]}',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const hooks: Story = (): React.ReactElement => {
  const formRef = useRef<TFormRefActions>(null);

  const getFormHooks = useCallback((availableActions = Object.values(TAvailableHooks)) => {
    const basePath = `./hooks`;
    const actions: Record<string, unknown> = {};
    for (let i = 0; i < availableActions.length; i++) {
      const path = `${basePath}/${availableActions[i]}/${availableActions[i]}`;
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        actions[availableActions[i]] = require(`${path}.ts`).default();
      } catch (_) {
        continue;
      }
    }
    return actions;
  }, []);

  const formHooks = useMemo(getFormHooks, []);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form ref={formRef} schema={schema} hooks={formHooks} onSubmit={console.log} />
      <button onClick={() => formRef?.current?.submit()}>Submit</button>
    </FormProvider>
  );
};
