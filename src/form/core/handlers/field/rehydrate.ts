import * as Events from 'core/events';
import * as apis from 'core/apis';
import { TComponent } from 'core/types';

export const handler = ({ form, field, eventReducedSchema }: Events.TEventInformation) => {
  eventReducedSchema?.rehydrate?.forEach((config) => {
    config.fields.forEach((fieldName) => {
      const targetField = form.fields[fieldName];
      const errors = apis.validations.run(targetField.value, config.validations);
      const hasError = field.fieldHasError(errors);

      if (hasError) return;

      targetField.rehydrate();
    });
  });
};

export const events = (component: TComponent) => Object.keys(component.rehydrate || {});
