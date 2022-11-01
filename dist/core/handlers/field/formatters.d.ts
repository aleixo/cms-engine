import { TComponent } from '../../types.js';
import { TEventInformation } from '../../events/index.js';
export declare const handler: ({ data, field, eventReducedSchema: { formatters } }: TEventInformation) => void;
export declare const events: (component: TComponent) => string[];
