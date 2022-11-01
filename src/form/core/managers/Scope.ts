import { TScope, TSetGlobalScope } from 'core/types';
import * as Events from 'core/events';
import { Observer } from 'core/events';
import Base from './Base';

class Scope extends Base {
  #scope: TScope = {
    global: {},
    api: {},
    hooks: {},
    configs: {},
    fields: {},
  };

  constructor(observer: Observer) {
    super(observer);
  }

  get scope() {
    return this.#scope || {};
  }

  getGlobalScope<T extends TScope>(namespace?: string, key?: string): T {
    if (namespace && !key && this.scope[namespace]) return this.scope[namespace];
    if (namespace && key && this.scope[namespace]) return this.scope[namespace][key];

    return this.#scope as T;
  }

  set initialScope(data: TScope) {
    this.#scope = data || this.#scope;
  }

  set globalScope({ namespace, key, data }: TSetGlobalScope) {
    if (!key) {
      this.#scope[namespace] = data;
    }

    if (key && !this.#scope[namespace]) {
      this.#scope[namespace] = {
        [key]: data,
      };
    }
    if (this.#scope[namespace] && key) {
      this.#scope[namespace] = {
        ...this.#scope[namespace],
        [key]: data,
      };
    }

    // If no key is given, we will build one event based on regex to match all keys for a given namespace
    const eventName = key
      ? Events.BUILD_EVENT(Events.EEVents.ON_SCOPE_CHANGE, namespace, key)
      : Events.ALL_NAMESPACE_EVENTS(Events.BUILD_EVENT(Events.EEVents.ON_SCOPE_CHANGE, namespace, key));
    this.publish(eventName, { scope: this.scope, namespace, key });
  }
}

export default Scope;
