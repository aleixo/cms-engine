"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.events = void 0;
const DEFAULT_DEBOUNCE_MS = 200;
const handler = ({
  field,
  eventReducedSchema: {
    api
  }
}) => api.forEach(apiCall => {
  const {
    scope
  } = field;
  if (apiCall.blockRequestWhenInvalid && field.fieldValidationsHaveError(false)) return;
  scope.globalScope = {
    namespace: 'api',
    key: apiCall.scope,
    data: {
      loading: true
    }
  };
  field.debounce(() => {
    return fetch(apiCall.url, Object.assign(Object.assign({
      method: apiCall.method
    }, apiCall.body && {
      body: JSON.stringify(apiCall.body)
    }), {
      headers: apiCall.headers || {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })).then(res => {
      const parsedResponse = res.json();
      if (res.status >= 400) throw parsedResponse;
      return parsedResponse;
    }).then(res => {
      scope.globalScope = {
        namespace: 'api',
        key: apiCall.scope,
        data: Object.assign({
          loading: false,
          response: res
        }, res)
      };
    }).catch(err => {
      scope.globalScope = {
        namespace: 'api',
        key: apiCall.scope,
        data: {
          loading: false,
          error: true,
          err: JSON.stringify(err)
        }
      };
    });
  }, apiCall.debounceTime || DEFAULT_DEBOUNCE_MS);
});
exports.handler = handler;
const events = component => Object.keys(component.api || {});
exports.events = events;