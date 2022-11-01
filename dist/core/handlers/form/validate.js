"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  form,
  payload
}) => {
  const extractScopedChildrenFromOptions = opts => {
    if (!opts || !Object.keys(opts).length || !opts.scopeBlurredChildren && !opts.scopeChangedChildren && !opts.childrenScope) return undefined;
    return Object.keys(form.fields).filter(key => {
      var _a;
      return (opts === null || opts === void 0 ? void 0 : opts.scopeBlurredChildren) && form.fields[key].data.blured || (opts === null || opts === void 0 ? void 0 : opts.scopeChangedChildren) && form.fields[key].data.changed || ((_a = opts === null || opts === void 0 ? void 0 : opts.childrenScope) === null || _a === void 0 ? void 0 : _a.includes(key));
    });
  };
  const getScopedField = childrenScope => {
    if (!childrenScope) return form.fields;
    return Object.keys(form.fields).reduce((acc, key) => {
      if (!childrenScope.includes(key)) return acc;
      return Object.assign(Object.assign({}, acc), {
        [key]: form.fields[key]
      });
    }, {});
  };
  const fields = getScopedField(extractScopedChildrenFromOptions(payload));
  Object.keys(fields).forEach(key => {
    if (fields[key].fieldValidationsHaveError(true)) {
      fields[key].rehydrate();
    }
  });
};
exports.handler = handler;