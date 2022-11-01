import { TComponent } from 'core';
import * as apis from 'core/apis';
import * as Events from 'core/events';
import { EFlowLogging } from 'core/events/events.types';

export const handler = ({ field, eventReducedSchema: { validations } }: Events.TEventInformation) => {
  field.logInfo(EFlowLogging.FIELD_HANDLER, '', 'validations');
  if (!validations) {
    return;
  }

  const error = apis.validations.run(field.data.value, validations, field.scopedComponent.errorMessages);
  field.errors = error;
  (field.data.failedErrorMessages as string[]) = field.getFieldErrorMessages(field.data);
};

export const events = (component: TComponent) => Object.keys(component.validations || {});
