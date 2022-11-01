import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { handler } from './blur';
describe('Testing handlers/field/blur', () => {
  it('Should use formatter', async () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      formatters: {
        ON_FIELD_BLUR: {
          capitalize: true,
        },
      },
    };

    const form = getFormInstance('name');
    const field = form.getFieldInstance(component, {});

    field.value = 'diogo';
    const res = await handler({ field, eventReducedSchema: { formatters: component.formatters?.ON_FIELD_BLUR } });
    expect(field.value).toBe('diogo');
    expect(res).toBeFalsy();
  });
});
