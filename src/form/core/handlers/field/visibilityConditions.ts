import * as Events from 'core/events';
import * as apis from 'core/apis';
import { TComponent } from 'core/types';

export const handler = ({ form, field, eventReducedSchema }: Events.TEventInformation) => {
  eventReducedSchema.visibilityConditions?.forEach((condition) => {
    const fieldNames = [...(condition.fieldNames || [condition.fieldName])];

    fieldNames.forEach((targetFieldName) => {
      if (!targetFieldName) return;
      const hasError = field.fieldHasError(apis.validations.run(field.value, condition.validations));
      // IF ITS NOT INITIALIZED, SUBSCRIBE TO ITS MOUNT
      if (!form.fields[targetFieldName]) {
        field.subscribe(Events.BUILD_EVENT(Events.EEVents.ON_FIELD_MOUNT, targetFieldName), () => {
          form.fields[targetFieldName].visibility = !hasError;
          form.fields[targetFieldName].rehydrate();
        });
        return;
      }

      form.fields[targetFieldName].visibility = !hasError;
      form.fields[targetFieldName].rehydrate();
    });
  });
};

export const events = (component: TComponent) => Object.keys(component.visibilityConditions || {});
