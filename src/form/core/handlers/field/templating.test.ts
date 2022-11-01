import { TComponent, BUILD_EVENT } from 'core';
import { EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import { handler } from './templating';

const form = getFormInstance('dsadasewqww', {
  initialScope: {
    global: {
      foo: 'bar',
      someFieldName: 'nestedField',
    },
  },
});

describe('Testing handlers/field/templating', () => {
  describe('Test Replace in several locations', () => {
    it('Tests in templating in errorMessages', () => {
      const component: TComponent = {
        component: 'input',
        name: 'field',
        errorMessages: {
          required: 'Error - ${fields.field.value}',
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'field value';
      handler({ field });
      expect(field.scopedComponent.errorMessages?.required).toBe('Error - field value');
    });
    it('Tests in templating in api', () => {
      const component: TComponent = {
        component: 'input',
        name: 'apiField',
        api: {
          ON_FIELD_MOUNT: [
            {
              method: 'POST',
              url: 'www.google.pt?query=${fields.apiField.value}',
            },
          ],
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'googlequerystring';
      handler({ field });
      expect(field.scopedComponent.api?.ON_FIELD_MOUNT[0].url).toBe('www.google.pt?query=googlequerystring');
    });
    it('Tests in templating in props', () => {
      const component: TComponent = {
        component: 'input',
        name: 'propsField',
        props: {
          method: 'POST',
          url: 'www.google.pt?query=${fields.propsField.value}',
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'googlequerystring';
      expect(handler({ field }));
      expect(field.scopedComponent.props?.url).toBe('www.google.pt?query=googlequerystring');
    });
    it('Tests in templating in validations', () => {
      const component: TComponent = {
        component: 'input',
        name: 'lessThanField',
        validations: {
          ON_FIELD_BLUR: {
            lessThan: '${fields.lessThanField.value}',
          },
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = '2';
      expect(handler({ field }));
      expect(field.scopedComponent.validations?.ON_FIELD_BLUR?.lessThan).toBe(2);
    });
    it('Tests in templating in masks', () => {
      const component: TComponent = {
        component: 'input',
        name: 'maskField',
        masks: {
          onBlur: {
            generic: [
              {
                from: 0,
                to: 2,
                mask: '${fields.maskField.value}',
              },
              {
                from: 3,
                to: 5,
                mask: '${global.foo}',
              },
            ],
          },
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'XXX';
      expect(handler({ field }));
      expect((field.scopedComponent.masks?.onBlur?.generic)![0].mask).toBe('XXX');
      expect((field.scopedComponent.masks?.onBlur?.generic)![1].mask).toBe('bar');
    });
    it('Tests in templating in formatters', () => {
      const component: TComponent = {
        component: 'input',
        name: 'formattersField',
        formatters: {
          onBlur: {
            splitter: [
              {
                position: 2,
                value: '${fields.formattersField.value}',
              },
              {
                position: 2,
                value: '${global.foo}',
              },
            ],
          },
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'baz';
      handler({ field });
      expect((field.scopedComponent.formatters?.onBlur?.splitter)![0].value).toBe('baz');
      expect((field.scopedComponent.formatters?.onBlur?.splitter)![1].value).toBe('bar');
    });
    it('Tests in templating in filters', () => {
      const component: TComponent = {
        component: 'input',
        name: 'filtersField',
        filter: {
          lessThan: '${fields.filtersField.value}',
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = 'baz';
      handler({ field });
      expect(field.scopedComponent.filter?.lessThan).toBe('baz');
    });
  });
  it('Assert nested templates replace', () => {
    const component: TComponent = {
      component: 'input',
      name: 'nestedField',
      filter: {
        lessThan: '${fields.${global.someFieldName}.value}',
      },
    };
    const field = form.getFieldInstance(component, {});
    field.value = 'baz';
    handler({ field });
    expect(field.scopedComponent.filter?.lessThan).toBe('baz');
  });
  it('Should replace template default', () => {
    const component: TComponent = {
      component: 'input',
      name: 'defaultField',
      filter: {
        lessThan: '${fields.${global.someFieldName2||nestedField}.value}',
        greaterThan: '${fields.${global.someFieldName2}.value||2}',
      },
    };
    const field = form.getFieldInstance(component, {});
    field.value = 'baz';
    handler({ field });
    expect(field.scopedComponent.filter?.lessThan).toBe('baz');
    expect(field.scopedComponent.filter?.greaterThan).toBe(2);
  });
  it('Non templated component should not subscribe to scope changes', () => {
    const component: TComponent = {
      component: 'input',
      name: 'nonTemplatedField',
      filter: {
        lessThan: 2,
        greaterThan: 2,
      },
    };
    const field = form.getFieldInstance(component, {});
    field.value = 'baz';

    const subscribeSpy = jest.spyOn(field, 'subscribe');

    handler({ field });
    expect(field.scopedComponent.filter?.lessThan).toBe(2);
    expect(subscribeSpy).not.toHaveBeenCalled();
  });
  it('Should subscribe to scope changes on a given namespace and key', () => {
    const component: TComponent = {
      component: 'input',
      name: 'templatedField',
      filter: {
        lessThan: '${fields.templatedField.value}',
        greaterThan: 2,
      },
    };
    const field = form.getFieldInstance(component, {});
    field.value = '2';

    const subscribeSpy = jest.spyOn(field, 'subscribe');

    handler({ field });
    expect(field.scopedComponent.filter?.lessThan).toBe(2);
    expect(subscribeSpy).toHaveBeenCalled();
  });

  describe('Test subscription to scope for template ON_SCOPE_CHANGE', () => {
    it('Test scope changes field when subscribe to scope changed', () => {
      const component: TComponent = {
        component: 'input',
        name: 'templatedField',
        filter: {
          lessThan: '${fields.templatedField.value}',
          greaterThan: 2,
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = '2';

      const subscribeSpy = jest.spyOn(field, 'subscribe');

      handler({ field });
      expect(field.scopedComponent.filter?.lessThan).toBe(2);
      expect(subscribeSpy).toHaveBeenCalled();

      field.value = '3';

      expect(field.scopedComponent.filter?.lessThan).toBe(3);
    });
    it('Test rehydrating field when subscribe to scope changed', () => {
      const component: TComponent = {
        component: 'input',
        name: 'templatedField',
        filter: {
          lessThan: '${fields.templatedField.value}',
          greaterThan: 2,
        },
      };
      const field = form.getFieldInstance(component, {});
      field.value = '2';

      const subscribeSpy = jest.spyOn(field, 'subscribe');
      const fieldRehydrateSpy = jest.spyOn(field, 'rehydrate');

      handler({ field });
      expect(field.scopedComponent.filter?.lessThan).toBe(2);
      expect(subscribeSpy).toHaveBeenCalled();

      field.publish(BUILD_EVENT(EEVents.ON_SCOPE_CHANGE, 'fields', 'templatedField'));

      expect(subscribeSpy).toHaveBeenCalled();
      expect(fieldRehydrateSpy).toHaveBeenCalled();
      expect(field.scopedComponent.filter?.lessThan).toBe(2);
    });
  });
});
