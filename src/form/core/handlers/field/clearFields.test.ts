import { EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { events, handler } from './clearFields';
describe('Testing handlers/fiels/effects', () => {
  it('Assert that events registered are the correct ones', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      clearFields: {
        ON_FIELD_CHANGE: [],
        ON_FIELD_MOUNT: [],
      },
    };

    expect(events(component)).toEqual([EEVents.ON_FIELD_CHANGE, EEVents.ON_FIELD_MOUNT]);
  });

  describe('Testing clear fields', () => {
    const form = getFormInstance('aaaaasaaaaaaa');
    const component1: TComponent = {
      component: 'input',
      name: 'field1',
    };
    const component2: TComponent = {
      component: 'input',
      name: 'field2',
    };

    const component3: TComponent = {
      component: 'input',
      name: 'field3',
      clearFields: {
        ON_FIELD_CHANGE: [
          {
            validations: {
              required: true,
            },
            clearedValue: 'cleared',
            fields: ['field1', 'field2'],
          },
        ],
      },
    };

    const component4: TComponent = {
      component: 'input',
      name: 'field4',
    };

    const field = form.getFieldInstance(component1, {});
    const field2 = form.getFieldInstance(component2, {});
    const field3 = form.getFieldInstance(component3, {});
    const field4 = form.getFieldInstance(component4, {});

    it('Should assert that two field values are altered because there is no value on another field', () => {
      handler({
        field: field3,
        form,
        eventReducedSchema: { clearFields: component3.clearFields?.ON_FIELD_CHANGE },
      });
      expect(field.value).toBe('cleared');
      expect(field2.value).toBe('cleared');
      expect(field4.value).toBe(undefined);
    });
  });
});
