import { BUILD_EVENT, getFormInstance, TComponent } from 'core';
import { EEVents } from 'core/events';

describe('Testing core/apis/formatters', () => {
  describe('Test on different lifecycles', () => {
    it('ON_MOUNT mask initial value', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        masks: {
          ON_FIELD_MOUNT: {
            replaceAll: '*',
          },
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '222',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component1.name));
      expect(field1.value).toBe('***');
    });
    it('ON_FIELD_MOUNT show masks and then unmask after ON_FIELD_BLUR', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        masks: {
          ON_FIELD_MOUNT: {
            replaceAll: '*',
          },
          ON_FIELD_BLUR: {
            cleanMask: true,
          },
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '222',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component1.name));
      expect(field1.value).toBe('***');
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_BLUR, component1.name));
      expect(field1.value).toBe('222');
    });
    it('ON_FIELD_MOUNT show masks and then unmask after ON_FIELD_FOCUS', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        masks: {
          ON_FIELD_MOUNT: {
            replaceAll: '*',
          },
          ON_FIELD_FOCUS: {
            cleanMask: true,
          },
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
        initialValues: {
          [component1.name]: '222',
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component1.name));
      expect(field1.value).toBe('***');
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_FOCUS, component1.name));
      expect(field1.value).toBe('222');
    });
    it('ON_FIELD_BLUR mask field value', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        masks: {
          ON_FIELD_BLUR: {
            replaceAll: '*',
          },
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.value = '222';
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_BLUR, component1.name));
      expect(field1.value).toBe('***');
    });
    it('ON_FIELD_FOCUS mask field value', () => {
      const component1: TComponent = {
        component: 'input',
        name: 'n',
        masks: {
          ON_FIELD_FOCUS: {
            replaceAll: '*',
          },
        },
      };

      const form = getFormInstance(Math.random().toString(), {
        schema: {
          components: [
            {
              component: '',
              name: '',
              children: [component1],
            },
          ],
        },
      });
      const field1 = form.getFieldInstance(component1, {});
      field1.value = '222';
      field1.publish(BUILD_EVENT(EEVents.ON_FIELD_FOCUS, component1.name));
      expect(field1.value).toBe('***');
    });
  });
});
