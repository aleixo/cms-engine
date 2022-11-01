import { Observer } from '../events/index.js';
import { EFlowLogging, TEventsKeys } from '../events/events.types.js';
declare class Base {
    #private;
    subscriptions: {
        [x in TEventsKeys]?: () => void;
    };
    debounceTime: number;
    constructor(observer: Observer);
    subscribe(event: TEventsKeys, cb: (...data: any) => void): void;
    subscribeBulk(events: TEventsKeys[], cb: (...data: any) => void): void;
    publish(events: TEventsKeys, data?: {}): void;
    publishFor(events: TEventsKeys): any;
    debounce: (fn: any, debounceTime?: number) => Promise<void>;
    logError(file: EFlowLogging, event: string, method: string, error: unknown): void;
    logInfo(file: EFlowLogging, event: string, method: string, extraData?: unknown): void;
}
export default Base;
