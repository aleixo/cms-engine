import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { handler } from './change';
describe('Testing handlers/field/blur', () => {
  it('Should set parsedData from htmlFIeldParser handler and from event data chain', async () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      formatters: {
        ON_FIELD_CHANGE: {
          capitalize: true,
        },
      },
    };

    const form = getFormInstance('name');
    const field = form.getFieldInstance(component, {});

    handler({ field, data: { parsedEventValue: 'test' } });
    expect(field.value).toBe('test');
  });
  it('Should set metadata that comes from event data chain', async () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      formatters: {
        ON_FIELD_CHANGE: {
          capitalize: true,
        },
      },
    };

    const form = getFormInstance('name');
    const field = form.getFieldInstance(component, {});

    handler({ field, data: { metadata: { data: true } } });
    expect(field.data.metadata).toEqual({ data: true });
  });
});
