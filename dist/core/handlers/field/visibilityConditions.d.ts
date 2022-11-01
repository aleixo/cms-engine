import * as Events from '../../events/index.js';
import { TComponent } from '../../types.js';
export declare const handler: ({ form, field, eventReducedSchema }: Events.TEventInformation) => void;
export declare const events: (component: TComponent) => string[];
