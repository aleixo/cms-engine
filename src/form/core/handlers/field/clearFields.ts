import * as Events from 'core/events';
import * as apis from 'core/apis';
import { TComponent } from 'core/types';
import { EFlowLogging } from 'core/events/events.types';

export const handler = ({ form, eventReducedSchema }: Events.TEventInformation) => {
  eventReducedSchema?.clearFields.forEach((clearField) => {
    clearField.fields.forEach((fieldName) => {
      const targetField = form.fields[fieldName];
      if (!clearField.validations) {
        targetField.logInfo(EFlowLogging.FIELD_HANDLER, 'rehydrate', 'clearFields', { clearField });
        targetField.value = clearField.clearedValue;
        targetField.rehydrate();

        return;
      }
      if (!targetField) return;

      const errors = apis.validations.run(targetField.value, clearField.validations);

      if (!targetField.fieldHasError(errors)) return;
      targetField.value = clearField.clearedValue;
      targetField.rehydrate();
      targetField.logInfo(EFlowLogging.FIELD_HANDLER, 'rehydrate', 'clearFields', { clearField });
    });
  });
};

export const events = (component: TComponent) => Object.keys(component.clearFields || {});
