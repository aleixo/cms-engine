import { TEventInformation } from 'core/events';

export const handler = ({ field, data: { event } }: TEventInformation) => {
  let parsedEventValue: any = undefined;
  let metadata: any = undefined;
  //HTML event values here
  const htmlTargetTypesMapper: Record<string, string | number | boolean> = {
    text: event?.target?.value,
    number: parseInt(event?.target?.value),
    checkbox:
      event?.target?.checked && field.scopedComponent.props?.value ? event?.target?.value : event?.target?.checked,
    textarea: event?.target?.value,
    'select-one': event?.target?.value,
  };

  parsedEventValue = htmlTargetTypesMapper[event?.target?.type];

  if (Array.isArray(event) || typeof event !== 'object' || typeof event === 'string' || typeof event === 'number') {
    parsedEventValue = event;
  }

  if (event?.id) {
    parsedEventValue = event?.id;
    metadata = event;
  }

  if (event?.options) {
    parsedEventValue = event?.options;
  }

  const isDeletingValue = parsedEventValue?.toString().length < (field.data?.value?.toString()?.length || 0);
  // Here the value is extracted from wherever we want

  return {
    parsedEventValue,
    metadata,
    isDeletingValue,
  };
};
