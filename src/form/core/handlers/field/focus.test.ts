import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { handler } from './focus';
describe('Testing handlers/field/focus', () => {
  it('Should not clean mask because schema does not have masks.cleanMask', () => {
    const component: TComponent = {
      component: 'input',
      name: 'ss',
      masks: { ON_FIELD_CHANGE: { cleanMask: false } },
    };

    const form = getFormInstance('sssdd');
    const field = form.getFieldInstance(component, {});

    field.data.mask = 'XXXXX';
    handler({ field, eventReducedSchema: { masks: component.masks?.ON_FIELD_CHANGE } });
    expect(field.data.mask).toEqual('XXXXX');
  });
});
