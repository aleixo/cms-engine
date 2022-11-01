import { getFormInstance } from 'core/managers';
import { handler } from './validate';
describe('Testing core/form/validate', () => {
  it('Should run validations on all fields', () => {
    const form = getFormInstance('nameeeeee');
    const field1 = form.getFieldInstance(
      {
        component: 'input',
        name: 't',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    const field = form.getFieldInstance(
      {
        component: 'input',
        name: 'test2',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    handler({
      form,
      payload: {},
    });

    expect(field1.fieldHasError()).toBeTruthy();
    expect(field.fieldHasError()).toBeTruthy();
  });
  it('Should run validations on blured fields only', () => {
    const form = getFormInstance('name2');
    const fieldToBlur = form.getFieldInstance(
      {
        component: 'input',
        name: 'test',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    const field = form.getFieldInstance(
      {
        component: 'input',
        name: 'test2',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    fieldToBlur.data.blured = true;
    handler({
      form,
      payload: {
        scopeBlurredChildren: true,
      },
    });

    expect(fieldToBlur.fieldHasError()).toBeTruthy();
    expect(field.fieldHasError()).toBeFalsy();
  });

  it('Should run validations on changed fields only', () => {
    const form = getFormInstance('name4');
    const fieldToChange = form.getFieldInstance(
      {
        component: 'input',
        name: 'test',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    const field = form.getFieldInstance(
      {
        component: 'input',
        name: 'test2',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    fieldToChange.data.changed = true;
    handler({
      form,
      payload: {
        scopeChangedChildren: true,
      },
    });

    expect(fieldToChange.fieldHasError()).toBeTruthy();
    expect(field.fieldHasError()).toBeFalsy();
  });
  it('Should run validations on specific fields', () => {
    const form = getFormInstance('dsadasdsa');
    const field1 = form.getFieldInstance(
      {
        component: 'input',
        name: 'test',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    const field = form.getFieldInstance(
      {
        component: 'input',
        name: 'test2',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );

    handler({
      form,
      payload: {
        childrenScope: ['test'],
      },
    });

    expect(field1.fieldHasError()).toBeTruthy();
    expect(field.fieldHasError()).toBeFalsy();
  });
  it('Runs rehydrate on validated fields, and only on them', () => {
    const form = getFormInstance('dsadasdsa');
    form.getFieldInstance(
      {
        component: 'input',
        name: 'test',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    form.getFieldInstance(
      {
        component: 'input',
        name: 'test2',
        validations: {
          ON_FIELD_BLUR: {
            required: true,
          },
        },
      },
      {},
    );
    const spyedRehydrateTest = jest.spyOn(form.fields['test'], 'rehydrate');
    const spyedRehydrateOtherField = jest.spyOn(form.fields['test2'], 'rehydrate');

    handler({
      form,
      payload: {
        childrenScope: ['test'],
      },
    });

    expect(spyedRehydrateTest).toHaveBeenCalled();
    expect(spyedRehydrateOtherField).toHaveBeenCalledTimes(0);
  });
});
