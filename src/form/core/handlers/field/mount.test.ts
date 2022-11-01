import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { handler } from './mount';

describe('Testing handlers/field/mount', () => {
  it('Should set static initial value from schema', () => {
    const form = getFormInstance('d');
    const component: TComponent = {
      component: 'input',
      name: 'out',
      props: { value: 'test' },
    };
    const field = form.getFieldInstance(component, { setValue: 'value' });

    handler({ form, field, eventReducedSchema: {} });
    expect(field.data.value).toBe('test');
  });
  it('Should set initialValue in the field from form', () => {
    const form = getFormInstance('ds', {
      initialValues: {
        outfromform: 'frominiitialvalues',
      },
    });
    const component: TComponent = {
      component: 'input',
      name: 'outfromform',
      props: { value: 'test' },
    };
    const field = form.getFieldInstance(component, { setValue: 'value' });

    handler({ form, field, eventReducedSchema: {} });
    expect(field.data.value).toBe('frominiitialvalues');
  });
  it('Should set groupvalue in the field from form initialValues', () => {
    const form = getFormInstance(Math.random().toString(), {
      initialValues: {
        groupname: 'Yes',
      },
    });
    const component: TComponent = {
      component: 'input',
      name: 'group',
      group: 'groupname',
      props: { value: 'Yes' },
    };
    const component2: TComponent = {
      component: 'input',
      name: 'group2',
      group: 'groupname',
      props: { value: 'No' },
    };
    const field = form.getFieldInstance(component, { setValue: 'value' });
    const field2 = form.getFieldInstance(component2, { setValue: 'value' });

    handler({ form, field });
    expect(field.value).toBe('Yes');
    handler({ form, field: field2 });
    expect(field2.value).toBe('No');
  });
});
