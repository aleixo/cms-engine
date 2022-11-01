import * as Events from 'core/events';

export const handler = ({ field }: Events.TEventInformation) => {
  field.data.blured = true;
};
