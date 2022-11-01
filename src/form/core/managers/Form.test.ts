import Form from './Form';
import Scope from './Scope';

import { Observer } from '../events/Observer';
import { CoreEvents } from 'core/events';

const formId = 'id';

describe('Testing Core/Form', () => {
  it('Assert the correct form id', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);
    expect(form.formId).toBe(formId);
  });

  it('Assert initial form data', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    expect(form.formData).toEqual({
      predictableErroredFields: [],
      erroredFields: [],
      fields: {},
      formatted: {},
      form: {
        scope: scope.getGlobalScope(),
        steps: form.step,
        isValid: false,
        messages: [],
      },
    });
  });

  it('Assert the form creates two fields', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);
    form.getFieldInstance(
      {
        component: 'input',
        name: 'field1',
      },
      {},
    );
    form.getFieldInstance(
      {
        component: 'input',
        name: 'field2',
      },
      {},
    );

    expect(Object.keys(form.fields)).toHaveLength(2);
  });

  it('Assert Creation of fields', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    form.getFieldInstance(
      {
        component: 'input',
        name: 'field1',
      },
      {},
    );

    form.step.index = 1;

    form.getFieldInstance(
      {
        component: 'input',
        name: 'field2',
      },
      {},
    );

    expect(Object.keys(form.steps)).toHaveLength(2);
    expect(Object.keys(form.steps)).toEqual(['0', '1']);
  });

  it('Asserts rehydrate is called with the corret event', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    //Assert publish
    const spiedPub = jest.spyOn(form, 'publish');
    form.rehydrate();
    expect(spiedPub).toBeCalled();

    //Assert correct event
    expect(spiedPub).toBeCalledWith(CoreEvents.ON_FORM_REHYDRATE);
  });

  it('Assert field has been destroyed', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    form.getFieldInstance(
      {
        component: 'input',
        name: 'field1',
      },
      {},
    );

    form.destroyField('field1');

    expect(form.fields.field1).toBeUndefined();
    expect(form.steps[0].field1).toBeUndefined();
  });

  it('Assert field of an specific step has been destroyed', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    form.getFieldInstance(
      {
        component: 'input',
        name: 'field1',
      },
      {},
    );

    form.step.index = 1;

    form.getFieldInstance(
      {
        component: 'input',
        name: 'field2',
      },
      {},
    );

    form.destroyField('field2');
    expect(form.fields.field1).toBeDefined();
    expect(form.steps[0].field1).toBeDefined();
    expect(form.steps[1].field2).toBeUndefined();
    expect(form.steps[1].field2).toBeUndefined();
  });

  it('Asserts nothing will be done if the field to be destroyed doesnt exists', () => {
    const observer = new Observer(formId);
    const scope = new Scope(observer);
    const form = new Form(formId, new Observer(formId), scope);

    expect(form.destroyField('field1')).toBeUndefined();
  });
});
