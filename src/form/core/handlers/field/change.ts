import * as Events from 'core/events';

export const handler = ({ field, data }: Events.TEventInformation) => {
  field.data.changed = true;
  field.data.metadata = data.metadata;
  field.value = data.parsedEventValue;
};
