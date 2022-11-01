import { BUILD_EVENT, EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import Field from 'core/managers/Field';
import Form from 'core/managers/Form';
import { handler } from './data';

let form: Form;
let field: Field;
let field1: Field;
let field2: Field;
let field3: Field;
let field4: Field;
let field5: Field;
const component = {
  component: '',
  name: 'field',
};
const component1 = {
  component: '',
  name: 'field1',
};
const component2 = {
  component: '',
  name: 'field2',
};
const component3 = {
  component: '',
  name: 'field3',
  validations: { ON_FIELD_BLUR: { required: true } },
};
const component4 = {
  component: '',
  name: 'field4',
  validations: { ON_FIELD_CHANGE: { required: true } },
};

const component5 = {
  component: '',
  name: 'nested.field',
};

const createForm = (namespace) => {
  form = getFormInstance(namespace, {
    schema: {
      validations: {
        path: {
          path: 'field',
          required: true,
        },
      },
      messages: {
        msg: {
          name: 'message_name',
          required: true,
          value: '',
        },
      },
      filteredFields: ['field1'],
      components: [
        {
          component: '',
          name: '',
          children: [component],
        },
      ],
    },
    initialScope: {
      global: 'sss',
    },
  });

  field = form.getFieldInstance(component, {});
  field1 = form.getFieldInstance(component1, {});
  field2 = form.getFieldInstance(component2, {});
  field3 = form.getFieldInstance(component3, {});
  field4 = form.getFieldInstance(component4, {});
  field5 = form.getFieldInstance(component5, {});
};

describe('Testing handlers/field/data', () => {
  beforeEach(() => {
    createForm(Math.random().toString());
  });
  describe('Test form specific data', () => {
    it('Form should be invalid', () => {
      handler({ form });
      expect(form.formData.form.isValid).toBeFalsy();
    });
    it('Form should be valid', () => {
      field.value = '2';
      field3.value = '22';
      field4.value = 'ds';
      handler({ form });
      expect(form.formData.form.isValid).toBeTruthy();
    });
  });
  describe('Test fields data', () => {
    it('Contains only the filtered fields', () => {
      field1.value = 'field1';
      field2.value = 'field2';
      handler({ form });
      expect(form.formData.filteredFields).toEqual({
        field1: 'field1',
      });
    });
    it('Assert the initial scope plus the internal scope', () => {
      field1.value = 'field1';
      field2.value = 'field2';
      handler({ form });
      expect(form.scope.scope).toEqual({
        fields: {
          field1: {
            blured: false,
            changed: false,
            errors: {},
            failedErrorMessages: [],
            focused: false,
            mounted: false,
            name: 'field1',
            value: 'field1',
            visible: true,
          },
          field2: {
            blured: false,
            changed: false,
            errors: {},
            failedErrorMessages: [],
            focused: false,
            mounted: false,
            name: 'field2',
            value: 'field2',
            visible: true,
          },
        },
        global: 'sss',
      });
    });
    it('Contains predictable errors with the predictable error', () => {
      handler({ form });
      expect(form.formData.predictableErroredFields).toEqual(['field3', 'field4']);
    });
    it('Publish onBlur should build errors in field', () => {
      form.publish(BUILD_EVENT(EEVents.ON_FIELD_BLUR, field3.component.name));
      expect(form.formData.predictableErroredFields).toEqual(['field3', 'field4']);
      expect(form.formData.fields.field3.errors).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Publish onChange should build errors in field', () => {
      form.publish(BUILD_EVENT(EEVents.ON_FIELD_CHANGE, field4.component.name));
      expect(form.formData.erroredFields).toEqual(['field4']);

      expect(form.formData.fields.field4.errors).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Should not return nameless fields ', () => {
      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: 'formGroup',
              name: '',
              children: [component],
            },
          ],
        },
        initialValues: {
          [component.name]: 'value',
        },
      });
      form.getFieldInstance(component);

      form.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component.name));

      expect(form.formData.formatted).toEqual({
        [component.name]: 'value',
      });
    });

    it('Test formData nested object (address.type))', () => {
      createForm(Math.random().toString());

      field5.value = 'valuefield5';

      handler({ form });

      expect(form.formData.formatted).toEqual({
        nested: {
          field: 'valuefield5',
        },
      });
    });
  });
});
