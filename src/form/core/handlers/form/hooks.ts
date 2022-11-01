import { TEventInformation } from 'core/events';
import { THookPayload, TSetGlobalScope } from 'core/types';

export const handler = ({ form }: TEventInformation): THookPayload => {
  return {
    setScope: (data: TSetGlobalScope) => (form.scope.globalScope = data),
  };
};
