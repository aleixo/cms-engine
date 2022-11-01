import * as apis from 'core/apis';
import * as Events from 'core/events';
import { ObserverError } from 'core/events/ObserverError';

export const handler = ({ field, data, eventReducedSchema: { formatters } }: Events.TEventInformation) => {
  const { errorMessages, filter } = field.scopedComponent;

  if (!filter || !data.parsedEventValue || data.isDeletingValue) return;

  // If field has formatted data lets try to undo it and then apply the filter
  const dataToFilter = formatters
    ? apis.formatters.run(data.parsedEventValue, formatters, true) || data.parsedEventValue
    : data.parsedEventValue;
  const error = apis.validations.run(dataToFilter, filter, errorMessages);

  if (field.fieldHasError(error)) {
    throw new ObserverError(`Filter applied ${JSON.stringify(filter)}`, { breaksObservingChain: true });
  }
};
