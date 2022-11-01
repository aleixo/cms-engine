import { TComponent } from 'core';
import * as apis from 'core/apis';
import * as Events from 'core/events';

export const handler = ({ field, eventReducedSchema: { masks } }: Events.TEventInformation) => {
  if (!masks) return;

  field.data.mask = masks?.cleanMask ? undefined : apis.masks.run(field.data.value, masks);
};

export const events = (component: TComponent) => Object.keys(component.masks || {});
