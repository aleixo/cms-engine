import { TComponent } from '../../index.js';
import * as Events from '../../events/index.js';
export declare const handler: ({ field, eventReducedSchema: { masks } }: Events.TEventInformation) => void;
export declare const events: (component: TComponent) => string[];
