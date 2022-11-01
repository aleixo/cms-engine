import { EEVents, TEventsKeys, TLoggingEvent } from './events.types.js';
declare type TObservable = (data: any, unsubscribe: () => void) => any;
declare type TEvents = Record<string, TObservable[]>;
interface IObservable {
    events: TEvents;
}
declare const EXTRACT_EVENT_NAMESPACE: (event: TEventsKeys) => EEVents;
declare const BUILD_EVENT: (event: EEVents, namespace?: string, key?: string) => EEVents;
declare const ALL_NAMESPACE_EVENTS: (event: TEventsKeys) => EEVents;
declare class Observer implements IObservable {
    #private;
    regexBasedEvents: Record<string, {
        regex: RegExp;
        handlers: TObservable[];
    }>;
    events: TEvents;
    namespace: string;
    enableLogging: boolean;
    constructor(namespace: string, enableLogging?: boolean);
    runForRegexBasedEvent(eventName: any, cb: (event: TEventsKeys) => void): boolean;
    handleRegexSubscription(eventName: any, handler: TObservable): void;
    /**
     * This function lets you subscribe to a given event and register one callback to be called when someone published in it
     *
     * The callback you redister will, return you the published data and one function to unregister your callback from that event
     *
     */
    subscribe(eventName: TEventsKeys, handler: TObservable): () => void;
    unsubscribe(eventName: TEventsKeys, handler: TObservable): void;
    isAsyncFunction(fn: (...data: any) => any): boolean;
    /**
     * Allows to publish data to a given event name
     *
     * Will iterate the subscriptions and call their handlers.
     *
     * When calling the handler, will also inject the unsubscribe function
     *
     * This methods also accepts one regex and will find the matchin events and
     * publish in them
     *
     */
    publish<T extends Record<string, unknown>>(eventName: TEventsKeys, data?: T): Promise<{} | undefined>;
    publishForEvents(eventName: TEventsKeys, data: {} | undefined, events: TEvents): Promise<{} | undefined>;
    logError(flow: Pick<TLoggingEvent, 'flow'>['flow'], event: string, method: string, error: unknown): void;
    logInfo(flow: Pick<TLoggingEvent, 'flow'>['flow'], event: string, method: string, extraData?: any): void;
}
export { Observer, EXTRACT_EVENT_NAMESPACE, BUILD_EVENT, ALL_NAMESPACE_EVENTS };
