import * as apis from 'core/apis';
import { TComponent } from 'core/types';
import { TEventInformation } from 'core/events';

export const handler = ({ data, field, eventReducedSchema: { formatters } }: TEventInformation) => {
  if (!formatters || data.isDeletingValue) return;

  field.data.value = apis.formatters.run(field.data.value, formatters);
};

export const events = (component: TComponent) => Object.keys(component?.formatters || []);
