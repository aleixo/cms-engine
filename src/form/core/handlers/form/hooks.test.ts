import { getFormInstance } from 'core/managers';
import { handler } from './hooks';

describe('Testing core/form/hooks', () => {
  it('Should allow to update scope from the callee', () => {
    const form = getFormInstance('dsadsa');
    const handlerActions = handler({ form });
    const spyGlobalScopeSetter = jest.spyOn(form.scope, 'globalScope', 'set');

    expect(handlerActions.setScope).toBeTruthy();

    handlerActions.setScope({
      data: {},
      namespace: 'api',
    });

    expect(spyGlobalScopeSetter).toHaveBeenCalled();
  });
});
