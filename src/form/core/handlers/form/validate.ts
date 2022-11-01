import * as Events from 'core/events';
import { TChildrenOptions } from 'core/types';

export const handler = ({ form, payload }: Events.TEventInformation) => {
  const extractScopedChildrenFromOptions = (opts?: TChildrenOptions): string[] | undefined => {
    if (
      !opts ||
      !Object.keys(opts).length ||
      (!opts.scopeBlurredChildren && !opts.scopeChangedChildren && !opts.childrenScope)
    )
      return undefined;

    return Object.keys(form.fields).filter((key) => {
      return (
        (opts?.scopeBlurredChildren && form.fields[key].data.blured) ||
        (opts?.scopeChangedChildren && form.fields[key].data.changed) ||
        opts?.childrenScope?.includes(key)
      );
    });
  };

  const getScopedField = (childrenScope?: string[]) => {
    if (!childrenScope) return form.fields;
    return Object.keys(form.fields).reduce((acc, key) => {
      if (!childrenScope.includes(key)) return acc;
      return {
        ...acc,
        [key]: form.fields[key],
      };
    }, {});
  };

  const fields = getScopedField(extractScopedChildrenFromOptions(payload));
  Object.keys(fields).forEach((key) => {
    if (fields[key].fieldValidationsHaveError(true)) {
      fields[key].rehydrate();
    }
  });
};
