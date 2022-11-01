import { EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { events, handler } from './visibilityConditions';
describe('Testing handlers/fiels/visibilityConditions', () => {
  it('Assert that events registered are the correct ones', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      visibilityConditions: {
        ON_FIELD_CHANGE: [],
        ON_FIELD_MOUNT: [],
      },
    };

    expect(events(component)).toEqual([EEVents.ON_FIELD_CHANGE, EEVents.ON_FIELD_MOUNT]);
  });
  describe('Testing visibility conditions', () => {
    const form = getFormInstance('sss');
    const component1: TComponent = {
      component: 'input',
      name: 'field1',
      visibilityConditions: {
        ON_FIELD_CHANGE: [
          {
            validations: {
              required: true,
            },
            fieldName: 'field2',
          },
        ],
      },
    };
    const component2: TComponent = {
      component: 'input',
      name: 'field2',
    };

    const component3: TComponent = {
      component: 'input',
      name: 'field3',
      visibilityConditions: {
        ON_FIELD_CHANGE: [
          {
            validations: {
              required: true,
            },
            fieldNames: ['field1', 'field2'],
          },
        ],
      },
    };

    const field3 = form.getFieldInstance(component3, {});
    const field = form.getFieldInstance(component1, {});
    const field2 = form.getFieldInstance(component2, {});
    it('Should toggle another field visibility ', () => {
      handler({
        field,
        form,
        eventReducedSchema: { visibilityConditions: component3.visibilityConditions?.ON_FIELD_CHANGE },
      });
      expect(field2.data.visible).toBeFalsy();
    });
    it('Should be possible to toggle several fields ', () => {
      field.data.visible = true;
      field2.data.visible = true;

      handler({
        field: field3,
        form,
        eventReducedSchema: { visibilityConditions: component3.visibilityConditions?.ON_FIELD_CHANGE },
      });
      expect(field.data.visible).toBeFalsy();
      expect(field2.data.visible).toBeFalsy();
    });
  });
});
