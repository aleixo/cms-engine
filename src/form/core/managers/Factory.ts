import Scope from './Scope';
import { Observer } from 'core/events';
import Form from './Form';

import { TSchema, TScope } from 'core/types';
import { DEFAULT_FORM_ID } from 'core/constants';

class Factory {
  workers: Record<string, Form> = {};

  constructor() {
    this.getFormInstance = this.getFormInstance.bind(this);
  }

  getFormInstance(
    namespace = DEFAULT_FORM_ID,
    opts?: {
      schema?: TSchema;
      initialScope?: TScope;
      initialValues?: Record<string, any>;
      newInstance?: boolean;
    },
  ) {
    if (this.workers[namespace] && !opts?.newInstance) {
      return this.workers[namespace];
    }

    const observer = new Observer(namespace, opts?.initialScope?.configs?.enableLogging);
    const scope = new Scope(observer);

    scope.initialScope = { ...opts?.initialScope, ...opts?.schema?.iVars };
    this.workers[namespace] = new Form(namespace, observer, scope, opts?.schema, opts?.initialValues);
    return this.workers[namespace];
  }
}

export default Factory;
