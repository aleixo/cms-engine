import { ALL_NAMESPACE_EVENTS, BUILD_EVENT, EEVents, Observer } from 'core/events';
import Scope from './Scope';
describe('Testing Scope', () => {
  it('Assert initial scope', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);
    const expectedInitialScope = {
      api: {
        dummy: true,
      },
      configs: {
        dummy: true,
      },
      fields: {
        dummy: true,
      },
      global: {
        dummy: true,
      },
      hooks: { dummy: true },
    };
    scope.initialScope = expectedInitialScope;

    expect(scope.scope).toEqual(expectedInitialScope);
  });
  it('Test getGlobalScope no namespace no key', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);
    const expectedInitialScope = {
      api: {
        dummy: true,
      },
      configs: {
        dummy: true,
      },
      fields: {
        dummy: true,
      },
      global: {
        dummy: true,
      },
      hooks: { dummy: true },
    };
    scope.initialScope = expectedInitialScope;
    const globalScope = scope.getGlobalScope();
    expect(globalScope).toEqual(expectedInitialScope);
  });
  it('Test getGlobalScope with namespace no key', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);
    const expectedInitialScope = {
      api: {
        dummy: true,
      },
      configs: {
        dummy: true,
      },
      fields: {
        dummy: true,
      },
      global: {
        dummy: true,
      },
      hooks: { dummy: true },
    };
    scope.initialScope = expectedInitialScope;
    const globalScope = scope.getGlobalScope('api');
    expect(globalScope).toEqual(expectedInitialScope.api);
  });
  it('Test getGlobalScope with namespace with key', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);
    const expectedInitialScope = {
      api: {
        dummy: true,
      },
      configs: {
        dummy: true,
      },
      fields: {
        dummy: true,
      },
      global: {
        dummy: true,
      },
      hooks: { dummy: true },
    };
    scope.initialScope = expectedInitialScope;
    expect(scope.getGlobalScope('api', 'dummy')).toEqual(expectedInitialScope.api.dummy);
  });
  it('Test set globalScope no key', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);

    scope.globalScope = {
      data: {
        data: true,
      },
      namespace: 'api',
    };
    expect(scope.scope.api).toEqual({ data: true });
  });
  it('Test set globalScope no key with existing scope in namespace', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);

    scope.globalScope = {
      data: {
        data: true,
      },
      namespace: 'api',
      key: 'testKey',
    };
    expect(scope.scope.api.testKey).toEqual({ data: true });
  });
  it('Test set globalScope publishing changes in observer for namespace and key changes', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);

    const publishSpy = jest.spyOn(observer, 'publish');

    scope.globalScope = {
      data: {
        data: true,
      },
      namespace: 'api',
      key: 'testKey',
    };

    expect(publishSpy).toBeCalledWith(BUILD_EVENT(EEVents.ON_SCOPE_CHANGE, 'api', 'testKey'), {
      scope: scope.scope,
      key: 'testKey',
      namespace: 'api',
    });
  });

  it('Test set globalScope publishing changes in observer for namespace changes only', () => {
    const observer = new Observer('');
    const scope = new Scope(observer);

    const publishSpy = jest.spyOn(observer, 'publish');

    scope.globalScope = {
      data: {
        data: true,
      },
      namespace: 'api',
    };

    expect(publishSpy).toBeCalledWith(ALL_NAMESPACE_EVENTS(BUILD_EVENT(EEVents.ON_SCOPE_CHANGE, 'api')), {
      scope: scope.scope,
      key: undefined,
      namespace: 'api',
    });
  });
});
