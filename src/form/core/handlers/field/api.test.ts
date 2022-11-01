import { EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import { TComponent } from 'core/types';
import { events, handler } from './api';

const fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({ fetchResponse: true }),
  });

global.fetch = fetch;

describe('Testing API', () => {
  describe('Test API event register', () => {
    it('Assert register to onChange', () => {
      const component: TComponent = {
        component: 'input',
        name: 'c',
        api: {
          ON_FIELD_CHANGE: [
            {
              url: '',
              method: 'POST',
            },
          ],
        },
      };
      expect(events(component)).toEqual([EEVents.ON_FIELD_CHANGE]);
    });
    it('Assert does not register to onMount', () => {
      const component: TComponent = {
        component: 'input',
        name: 'c',
        api: {
          ON_FIELD_MOUNT: [
            {
              url: '',
              method: 'POST',
            },
          ],
        },
      };
      expect(events(component)).toEqual([EEVents.ON_FIELD_MOUNT]);
    });
    it('Assert it registers to onBlur events', () => {
      const component: TComponent = {
        component: 'input',
        name: 'c',
        api: {
          ON_FIELD_BLUR: [
            {
              url: '',
              method: 'POST',
            },
          ],
        },
      };
      expect(events(component)).toEqual([EEVents.ON_FIELD_BLUR]);
    });
    it('Assert it registers to ALL events', () => {
      const component: TComponent = {
        component: 'input',
        name: 'c',
        api: {
          ON_FIELD_BLUR: [
            {
              url: '',
              method: 'POST',
            },
          ],
          ON_FIELD_CHANGE: [{ url: '', method: 'POST' }],
          ON_FIELD_MOUNT: [{ url: '', method: 'POST' }],
        },
      };
      expect(events(component)).toEqual([EEVents.ON_FIELD_BLUR, EEVents.ON_FIELD_CHANGE, EEVents.ON_FIELD_MOUNT]);
    });
  });

  it('Should block API request', async () => {
    const form = getFormInstance('namespace');
    const field = form.getFieldInstance(
      {
        component: 'input',
        name: 'c',
        validations: {
          ON_FIELD_BLUR: {
            value: true,
          },
        },
        api: {
          ON_FIELD_CHANGE: [
            {
              url: '',
              method: 'POST',
              blockRequestWhenInvalid: true,
            },
          ],
        },
      },
      {},
    );

    const response = await handler({
      field,
      fields: form.fields,
      eventReducedSchema: { api: field.component.api?.ON_FIELD_CHANGE },
    });
    expect(response).toBe(undefined);
  });

  it('Should request to the specified endpoint, and update scope', async () => {
    const component: TComponent = {
      component: 'input',
      name: 'c',
      api: {
        ON_FIELD_CHANGE: [
          {
            url: '',
            method: 'POST',
            scope: 'mock',
          },
        ],
      },
    };
    const form = getFormInstance('namespace');
    const field = form.getFieldInstance(component, {});

    const globalScopeSetterSpy = jest.spyOn(form.scope, 'globalScope', 'set');
    await handler({
      field,
      fields: form.fields,
      eventReducedSchema: { api: component.api?.ON_FIELD_CHANGE },
    });

    expect(globalScopeSetterSpy).toHaveBeenCalledTimes(1);
    expect(globalScopeSetterSpy).toHaveBeenNthCalledWith(1, {
      data: {
        loading: true,
      },
      key: 'mock',
      namespace: 'api',
    });
  });
  it('Should request to the specified endpoint, and update scope merging with existing', async () => {
    const component: TComponent = {
      component: 'input',
      name: 'c',
      api: {
        ON_FIELD_CHANGE: [
          {
            url: '',
            method: 'POST',
            scope: 'mock',
          },
        ],
      },
    };
    const form = getFormInstance('namespace', {
      initialScope: {
        api: {
          mock: {
            dummy: true,
          },
        },
      },
    });
    const field = form.getFieldInstance(component, {});

    const globalScopeSetterSpy = jest.spyOn(form.scope, 'globalScope', 'set');
    await handler({
      field,
      fields: form.fields,
      eventReducedSchema: { api: component.api?.ON_FIELD_CHANGE },
    });

    expect(globalScopeSetterSpy).toHaveBeenCalledTimes(2);
  });
});
