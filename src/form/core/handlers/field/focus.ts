import * as Events from 'core/events';

export const handler = ({ field }: Events.TEventInformation) => {
  field.data = {
    ...field.data,
    focused: true,
  };
};
