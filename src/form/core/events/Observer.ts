/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFormInstance } from 'core/managers';
import { EEVents, EFlowLogging, TEventInformation, TEventsKeys, TLoggingEvent, TObserverData } from './events.types';
import { ObserverError } from './ObserverError';

type TObservable = (data: any, unsubscribe: () => void) => any;

type TEvents = Record<string, TObservable[]>;

interface IObservable {
  events: TEvents;
}

const EXTRACT_EVENT_NAMESPACE = (event: TEventsKeys): EEVents => (event.split('/')[1] as EEVents) || ('' as EEVents);

const EXTRACT_CORE_NAMESPACE = (event: TEventsKeys): EEVents =>
  Array.isArray(event.split('/')) ? (event.split('/')[0] as EEVents) : (event as EEVents);

const BUILD_EVENT = (event: EEVents, namespace?: string, key?: string): EEVents => {
  if (!namespace) return event;

  return (event + '/' + namespace + (key ? '/' + key : '')) as EEVents;
};

const ALL_NAMESPACE_EVENTS = (event: TEventsKeys) => new RegExp(`^(${event}).*$`, 'g') as unknown as EEVents;

class Observer implements IObservable {
  regexBasedEvents: Record<string, { regex: RegExp; handlers: TObservable[] }> = {};
  events: TEvents = {};
  namespace: string;
  enableLogging: boolean;

  constructor(namespace: string, enableLogging = false) {
    this.namespace = namespace;
    this.enableLogging = enableLogging;
  }

  #buildEventPayload = ({ event, data, payload }: TObserverData): TEventInformation => {
    const eventFieldName = EXTRACT_EVENT_NAMESPACE(event);
    const form = getFormInstance(this.namespace);
    const field = form.fields[eventFieldName];

    return {
      eventReducedSchema: field && field.eventReducedSchema(EXTRACT_CORE_NAMESPACE(event)),
      coreEvent: EXTRACT_CORE_NAMESPACE(event),
      namespace: this.namespace,
      form,
      field,
      event,
      data,
      payload,
    };
  };

  runForRegexBasedEvent(eventName, cb: (event: TEventsKeys) => void) {
    let isMatchEvent = false;
    for (const event of Object.keys(this.events)) {
      isMatchEvent = (eventName as RegExp).test(event);
      isMatchEvent && cb(event as TEventsKeys);
    }

    return isMatchEvent;
  }

  handleRegexSubscription(eventName: any, handler: TObservable) {
    this.logInfo(EFlowLogging.OBSERVER, eventName, 'handleRegexSubscription');

    const foundEvent = this.runForRegexBasedEvent(eventName, (event) => this.subscribe(event as TEventsKeys, handler));

    if (!foundEvent) {
      this.regexBasedEvents[eventName] = {
        regex: eventName,
        handlers: Array.isArray(this.events[eventName]) ? [...this.events[eventName], handler] : [handler],
      };
    }
  }

  /**
   * This function lets you subscribe to a given event and register one callback to be called when someone published in it
   *
   * The callback you redister will, return you the published data and one function to unregister your callback from that event
   *
   */
  subscribe(eventName: TEventsKeys, handler: TObservable) {
    if (typeof eventName === 'object') {
      this.handleRegexSubscription(eventName, handler);
      return () => {};
    }
    this.logInfo(EFlowLogging.OBSERVER, eventName, 'subscribe');

    this.events = {
      ...this.events,
      [eventName]: Array.isArray(this.events[eventName]) ? [...this.events[eventName], handler] : [handler],
    };

    return () => {
      this.unsubscribe(eventName, handler);
    };
  }

  unsubscribe(eventName: TEventsKeys, handler: TObservable) {
    this.logInfo(EFlowLogging.OBSERVER, eventName, 'unsubscribe');

    this.events = {
      ...this.events,
      [eventName]: (this.events as TEvents)[eventName].filter((eventFn) => eventFn !== handler),
    };
  }

  isAsyncFunction(fn: (...data: any) => any) {
    const string = fn.toString().trim();
    return !!(
      fn[Symbol.toStringTag] === 'AsyncFunction' ||
      fn.constructor.name == 'AsyncFunction' ||
      string.match(/^async /) ||
      string.match(/return _ref[^\\.]*\.apply/) ||
      fn instanceof Promise
    );
  }

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
  async publish<T extends Record<string, unknown>>(eventName: TEventsKeys, data?: T) {
    if (typeof eventName === 'object') {
      this.runForRegexBasedEvent(eventName, (event) => this.publish(event as TEventsKeys, data));
      return;
    }

    for (const regexEvent of Object.keys(this.regexBasedEvents)) {
      const isMatchEvent = new RegExp(this.regexBasedEvents[regexEvent].regex).test(eventName);
      if (isMatchEvent) {
        this.publishForEvents(eventName, data, { [eventName]: this.regexBasedEvents[regexEvent].handlers });
      }
    }

    return this.publishForEvents(eventName, data, this.events);
  }

  async publishForEvents(eventName: TEventsKeys, data = {}, events: TEvents) {
    if (!events[eventName]) return {};
    let lastCallbackResult = {};

    for (const fn of events[eventName]) {
      try {
        if (!fn) return;
        const payload: TObserverData = this.#buildEventPayload({
          data: {
            ...data,
            ...lastCallbackResult,
          },
          payload: data,
          event: eventName,
          namespace: this.namespace,
        });
        const isAsync = this.isAsyncFunction(fn);

        this.logInfo(EFlowLogging.OBSERVER, eventName, 'publish', payload);

        const handlerRes = isAsync
          ? await fn(payload, () => this.unsubscribe(eventName, fn))
          : fn(payload, () => this.unsubscribe(eventName, fn));

        lastCallbackResult = {
          ...lastCallbackResult,
          ...handlerRes,
        };
      } catch (e) {
        if (e instanceof ObserverError && e.breaksObservingChain) {
          this.logError(EFlowLogging.OBSERVER, eventName, 'publish', e);
          return {};
        }
        throw e;
      }
    }

    return { ...lastCallbackResult, ...getFormInstance(this.namespace).formData };
  }

  logError(flow: Pick<TLoggingEvent, 'flow'>['flow'], event: string, method: string, error: unknown) {
    if (!this.enableLogging) return;
    event !== EEVents.LOG &&
      this.publish<TLoggingEvent>(EEVents.LOG, {
        level: 'error',
        data: {
          event,
          error,
        },
        action: method,
        flow,
      });
  }

  logInfo(flow: Pick<TLoggingEvent, 'flow'>['flow'], event: string, method: string, extraData?: any) {
    if (!this.enableLogging) return;
    event !== EEVents.LOG &&
      this.publish<TLoggingEvent>(EEVents.LOG, {
        level: 'info',
        data: {
          event,
          ...extraData,
        },
        action: method,
        flow,
      });
  }
}

export { Observer, EXTRACT_EVENT_NAMESPACE, BUILD_EVENT, ALL_NAMESPACE_EVENTS };
