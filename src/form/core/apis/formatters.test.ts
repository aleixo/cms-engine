import { BUILD_EVENT, getFormInstance, TComponent } from 'core';
import { EEVents } from 'core/events';
import { run } from './formatters';

describe('Testing core/apis/formatters', () => {
  it('Tests splitter when onblur', () => {
    const keystrokes = ['1', '1', '2', '2', '3', '3'];

    let result: any = '';
    keystrokes.forEach((key) => {
      result = run(result + key, {
        splitter: [
          {
            position: 2,
            value: '-',
          },
          {
            position: 5,
            value: '-',
          },
        ],
      });
    });

    expect(result).toBe('11-22-33');
  });

  it('Tests splitter when splitter position is the same as the string length', () => {
    const val = '222';

    const res = run(val, {
      splitter: [
        {
          position: 2,
          value: '-',
        },
        {
          position: 5,
          value: '-',
        },
      ],
    });

    expect(res).toBe('22-2');
  });
  describe('Test on different lifecycles', () => {
    it('ON_MOUNT', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        formatters: {
          ON_FIELD_MOUNT: {
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
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '222',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component1.name));
      expect(field1.value).toBe('22/2');
    });
    it('ON_CHANGE', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        formatters: {
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
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '22',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_CHANGE, component1.name), {
        event: { target: { type: 'text', value: '223' } },
      });
      expect(field1.value).toBe('22/3');
    });
    it('ON_BLUR', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        formatters: {
          ON_FIELD_BLUR: {
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
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '22',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component1.name));
      field1.value = '222';
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_BLUR, component1.name));
      expect(field1.value).toBe('22/2');
    });
  });
});
it('Tests capitalize', () => {
  expect(
    run('diogo', {
      capitalize: true,
    }),
  ).toBe('Diogo');
});
// TODO - Needs to be tested with other credit cards
it('Tests gapsCreditCard', () => {
  expect(
    run('4242424242424242', {
      gapsCreditCard: [
        'visa',
        'mastercard',
        'american-express',
        'diners-club',
        'discover',
        'jcb',
        'unionpay',
        'maestro',
        'mir',
        'elo',
        'hiper',
        'hipercard',
      ],
    }),
  ).toBe('4242 4242 4242 4242');
});
