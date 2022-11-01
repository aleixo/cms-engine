import Field from './Field';
import { Observer } from '../events/Observer';
import Scope from './Scope';
import { BUILD_EVENT, CoreEvents, EEVents } from 'core/events';

const component = {
  name: 'field1',
  component: 'test',
  state: {
    hidden: true,
  },
};

const propsMapping = {
  getValue: 'onChange',
  setValue: 'value',
};

const formId = 'id';

describe('Testing Core/Field', () => {
  it('Assert initial field data is well build', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);
    expect(field.data).toEqual({
      blured: false,
      changed: false,
      errors: {},
      failedErrorMessages: [],
      focused: false,
      visible: false,
      name: 'field1',
      mounted: false,
    });
  });

  it('Validate field value when it has mask', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);
    field.data.mask = 'xx/XX';

    expect(field.value).toBe('xx/XX');
  });

  it('Tests field visibility when using component state prop', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(
      observer,
      { ...component, state: { hidden: true }, props: { value: 'schemaval' } },
      propsMapping,
      scope,
    );

    expect(field.isVisible).toBeFalsy();
  });

  it('Validate field value with no mask', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, { ...component, props: { value: 'sss' } }, propsMapping, scope);
    expect(field.value).toBe(undefined);
  });

  it('Set field value', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);

    field.value = 'value new';
    expect(field.value).toBe('value new');
  });

  it('Asserts set field data', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);

    const oldFieldData = { ...field.data };
    field.data = {
      ...field.data,
      value: 'VALUE',
      failedErrorMessages: ['ERROR'],
    };

    expect(field.data).toEqual({
      ...oldFieldData,
      value: 'VALUE',
      failedErrorMessages: ['ERROR'],
    });
  });

  it('Asserts field has no error messages', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);

    expect(field.getFieldErrorMessages()).toHaveLength(0);
  });

  it('Asserts field error message for error', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, { ...component, errorMessages: { required: 'message' } }, propsMapping, scope);
    field.errors = {
      required: {
        fail: true,
        message: 'test message',
        value: '',
      },
    };
    expect(field.getFieldErrorMessages()).toHaveLength(1);
    expect(field.getFieldErrorMessages()).toEqual(['message']);
  });

  it('Asserts field has no errors', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, component, propsMapping, scope);

    expect(field.fieldHasError()).toBeFalsy();
  });

  it('Asserts field has errors', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, { ...component, errorMessages: { required: 'message' } }, propsMapping, scope);
    field.errors = {
      required: {
        fail: true,
        message: 'test message',
        value: '',
      },
    };
    expect(field.fieldHasError()).toBeTruthy();
  });

  it('Assets validations on a given field and sets the error', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(
      observer,
      { ...component, validations: { onBlur: { required: true } } },
      propsMapping,
      scope,
    );
    field.fieldValidationsHaveError(true);

    expect(field.errors).toBeTruthy();
  });

  it('Assets NO validations made on a given when there is no definition in TComponent', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(
      observer,
      { ...component, validations: { onBlur: { required: true } } },
      propsMapping,
      scope,
    );
    field.visibility = false;
    expect(field.fieldValidationsHaveError(true)).toBeFalsy();
  });

  it('Assets NO validations made on a given when there is not visible', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(
      observer,
      { ...component, validations: { onBlur: { required: true } } },
      propsMapping,
      scope,
    );
    field.visibility = false;
    expect(field.fieldValidationsHaveError(true)).toBeFalsy();
  });

  it('Asserts Rehydrate call the correct topic', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const field = new Field(observer, { ...component, errorMessages: { required: 'message' } }, propsMapping, scope);

    //Assert publish
    const spiedPub = jest.spyOn(field, 'publish');
    field.rehydrate();
    expect(spiedPub).toBeCalled();

    //Assert correct event
    expect(spiedPub).toBeCalledWith(BUILD_EVENT(EEVents.ON_FIELD_REHYDRATE, component.name));
  });

  it('Test event reduced schema to ON_BLUR', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);

    const field = new Field(
      observer,
      {
        ...component,
        api: {
          ON_FIELD_BLUR: [
            {
              method: 'GET',
              url: 'url',
            },
          ],
          ON_FIELD_CHANGE: [
            {
              method: 'POST',
              url: 'dsada',
            },
          ],
        },
        formatters: {
          ON_FIELD_BLUR: {
            capitalize: true,
          },
        },
        validations: {
          ON_FIELD_BLUR: {
            email: true,
          },
          ON_FIELD_FOCUS: {
            hasNoExtraSpaces: true,
          },
        },
      },
      propsMapping,
      scope,
    );

    expect(field.eventReducedSchema(EEVents.ON_FIELD_BLUR)).toEqual({
      api: [
        {
          method: 'GET',
          url: 'url',
        },
      ],
      clearFields: undefined,
      formatters: {
        capitalize: true,
      },
      masks: undefined,
      rehydrate: undefined,
      validations: {
        email: true,
      },
      visibilityConditions: undefined,
    });
  });
});
