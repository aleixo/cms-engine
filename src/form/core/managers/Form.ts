import Field from './Field';
import Scope from './Scope';
import Base from './Base';

import * as Events from 'core/events';
import { TComponent, TFormValues, TSchema, TStepData, TComponentPropsMapping } from '../types';
import { formFlows, register } from 'core/handlers/flows';

class Form extends Base {
  #fields: { [x in string]: Field } = {};
  #observer: Events.Observer;
  formData: TFormValues;
  formId: string;
  schema?: TSchema;
  scope: Scope;
  initialValues: Record<string, unknown>;
  #step: TStepData;
  steps: Record<number, { [x in string]: Field }> = {};
  constructor(
    formId: string,
    observer: Events.Observer,
    scope: Scope,
    schema?: TSchema,
    initialValues: Record<string, unknown> = {},
  ) {
    super(observer);
    this.#observer = observer;
    this.schema = schema;
    this.scope = scope;
    this.formId = formId;
    this.initialValues = initialValues;

    this.#step = {
      numSteps: schema?.components.length,
      navigated: false,
      index: 0,
      currentStepSchema: schema?.components[0],
      isValid: false,
      data: {},
    };

    this.formData = {
      predictableErroredFields: [],
      erroredFields: [],
      fields: {},
      formatted: {},
      form: {
        scope: scope.getGlobalScope(),
        steps: this.#step,
        isValid: false,
        messages: [],
      },
    };

    register(observer, formFlows);
  }

  get step() {
    return this.#step;
  }

  set step(step: TStepData) {
    this.#step = step;
  }

  get fields() {
    return this.#fields || {};
  }

  getFieldInstance(component: TComponent, propsMapping: TComponentPropsMapping = {}) {
    component.name = component.name || component.component + '_' + JSON.stringify(component.props);
    if (!this.steps[this.#step.index]) {
      this.steps[this.#step.index] = {};
    }

    if (this.fields[component.name]) {
      return this.fields[component.name];
    }

    this.fields[component.name] = new Field(this.#observer, component, propsMapping, this.scope);
    this.steps[this.#step.index][component.name] = this.fields[component.name];
    return this.fields[component.name];
  }

  rehydrate() {
    this.publish(Events.CoreEvents.ON_FORM_REHYDRATE);
  }

  destroyField(field: string) {
    if (!this.#fields[field]) return;
    delete this.#fields[field];
    delete this.steps[this.#step.index][field];
  }
}

export default Form;
export type { Form };
