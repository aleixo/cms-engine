import { Observer } from 'core/events';
import { EFlowLogging, TEventsKeys } from 'core/events/events.types';

class Base {
  #observer: Observer;
  #debounceQueue: Record<string, NodeJS.Timer> = {};
  subscriptions: { [x in TEventsKeys]?: () => void };
  debounceTime = 50;

  constructor(observer: Observer) {
    this.#observer = observer;

    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.debounce = this.debounce.bind(this);
    this.subscribeBulk = this.subscribeBulk.bind(this);
    this.subscriptions = {};
  }

  subscribe(event: TEventsKeys, cb: (...data: any) => void) {
    if (this.subscriptions[event]) {
      this.subscriptions[event]!();
    }
    this.subscriptions[event] = this.#observer.subscribe(event, cb);
  }

  subscribeBulk(events: TEventsKeys[], cb: (...data: any) => void) {
    events.forEach((event) => this.subscribe(event, cb));
  }

  publish(events: TEventsKeys, data = {}) {
    this.#observer.publish(events, data);
  }
  publishFor(events: TEventsKeys): any {
    return async (data = {}) => {
      const x = await this.#observer.publish(events, data);
      return x;
    };
  }

  debounce = async (fn: any, debounceTime = this.debounceTime): Promise<void> => {
    return new Promise((resolve) => {
      if (this.#debounceQueue[fn]) [clearTimeout(this.#debounceQueue[fn])];

      this.#debounceQueue[fn] = setTimeout(() => {
        clearTimeout(this.#debounceQueue[fn]);
        resolve(fn());
      }, debounceTime);
    });
  };

  logError(file: EFlowLogging, event: string, method: string, error: unknown) {
    this.#observer.logError(file, event, method, error);
  }

  logInfo(file: EFlowLogging, event: string, method: string, extraData?: unknown) {
    this.#observer.logInfo(file, event, method, extraData);
  }
}

export default Base;
