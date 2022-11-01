import { SyntheticEvent } from 'react';

import * as apis from 'core/apis';
import * as Events from 'core/events';

import { fieldFlows, register } from 'core/handlers/flows';
import { TField, TComponent, TErrors, TComponentPropsMapping, TEventReducedSchema } from 'core/types';

import Scope from './Scope';
import Base from './Base';

class Field extends Base {
  #fieldData: TField;
  #component: TComponent;
  #scopedComponent: TComponent;
  #propsMapping: TComponentPropsMapping;
  scope: Scope;
  constructor(observer: Events.Observer, component: TComponent, propsMapping: TComponentPropsMapping, scope: Scope) {
    super(observer);

    this.scopedComponent = component;
    this.#component = component;
    this.#propsMapping = propsMapping;
    this.scope = scope;
    this.#fieldData = {
      blured: false,
      changed: false,
      errors: {},
      failedErrorMessages: [],
      focused: false,
      visible: !component.state?.hidden,
      name: component.name,
      mounted: false,
    };

    register(observer, fieldFlows, component);
  }

  get value() {
    if (
      this.#propsMapping.setValue &&
      this.#component.props &&
      this.scopedComponent.props &&
      typeof this.scopedComponent.props[this.#propsMapping.setValue] !== 'undefined' &&
      this.scopedComponent.props[this.#propsMapping.setValue] !== this.#component.props[this.#propsMapping.setValue]
    ) {
      return this.scopedComponent.props[this.#propsMapping.setValue];
    }

    return this.#fieldData.mask || this.#fieldData.value;
  }

  set value(value: any) {
    this.#fieldData.value = value;

    this.scope.globalScope = { namespace: 'fields', key: this.#component.name, data: this.#fieldData };
  }

  get component() {
    return this.#component;
  }

  get data() {
    return this.#fieldData;
  }

  set data(data: TField) {
    this.#fieldData = {
      ...this.#fieldData,
      ...data,
    };

    this.scope.globalScope = { namespace: 'fields', key: this.#component.name, data: this.#fieldData };
  }

  get isVisible() {
    return this.#fieldData.visible;
  }

  set visibility(visible: boolean) {
    this.#fieldData.visible = visible;
  }

  get scopedComponent() {
    return this.#scopedComponent;
  }

  set scopedComponent(component: TComponent) {
    this.#scopedComponent = component;
  }

  get errors() {
    return this.#fieldData.errors;
  }

  set errors(errors: TErrors) {
    this.#fieldData.errors = errors;
    this.scope.globalScope = { namespace: 'fields', key: this.#component.name, data: this.#fieldData };
  }

  get props() {
    if (!this.scopedComponent.name || !this.#propsMapping) return this.scopedComponent.props;

    const propsActionsMapping: Record<string, unknown> = {
      getValue: (event: SyntheticEvent) =>
        this.publish(Events.BUILD_EVENT(Events.EEVents.ON_FIELD_CHANGE, this.component.name), { event }),
      onBlur: (event: SyntheticEvent) =>
        this.publish(Events.BUILD_EVENT(Events.EEVents.ON_FIELD_BLUR, this.component.name), { event }),
      onFocus: (event: SyntheticEvent) =>
        this.publish(Events.BUILD_EVENT(Events.EEVents.ON_FIELD_FOCUS, this.component.name), { event }),
      setValue: this.value,
      setErrorMessage: this.getFieldErrorMessages()[0],
    };

    return Object.keys(this.#propsMapping).reduce((acc, key) => {
      if (typeof propsActionsMapping[key] === 'undefined') return acc;

      return {
        ...acc,
        [this.#propsMapping[key]]: propsActionsMapping[key],
      };
    }, this.#scopedComponent.props);
  }

  get mappings() {
    return this.#propsMapping;
  }

  getFieldErrorMessages(data = this.#fieldData): string[] {
    if (!data.errors) return [];

    return Object.keys(data.errors).reduce((acc, key) => {
      const { errors = {} } = data;
      if (!errors[key].fail) return acc;

      if (!this.scopedComponent.errorMessages) {
        return acc;
      }
      return [...acc, this.scopedComponent.errorMessages[key] || this.scopedComponent.errorMessages.default];
    }, [] as string[]);
  }

  fieldHasError(errors?: TErrors) {
    if (!errors) {
      errors = this.#fieldData.errors || {};
    }
    return !!Object.keys(errors).find((key) => errors && errors[key].fail, []);
  }

  fieldValidationsHaveError(setErrorMessages?: boolean): boolean {
    if (!this.#scopedComponent.validations || !this.#fieldData.visible) return false;
    return !!Object.keys(this.#scopedComponent.validations).find((key) => {
      const { validations = {}, errorMessages } = this.#scopedComponent as TComponent;
      const error = apis.validations.run(this.#fieldData.value, validations[key], errorMessages);

      if (setErrorMessages) {
        this.errors = error;
      }
      return this.fieldHasError(error);
    });
  }

  /**
   * 
    Calculates and returns the version of the current scoped object for a given event
   */
  eventReducedSchema(event: Events.TEventsKeys): TEventReducedSchema {
    return {
      api: this.#scopedComponent.api && this.#scopedComponent.api[event],
      clearFields: this.#scopedComponent.clearFields && this.#scopedComponent.clearFields[event],
      rehydrate: this.#scopedComponent.rehydrate && this.#scopedComponent.rehydrate[event],
      formatters: this.#scopedComponent.formatters && this.#scopedComponent.formatters[event],
      masks: this.#scopedComponent.masks && this.#scopedComponent.masks[event],
      validations: this.#scopedComponent.validations && this.#scopedComponent.validations[event],
      visibilityConditions:
        this.#scopedComponent.visibilityConditions && this.#scopedComponent.visibilityConditions[event],
    };
  }

  rehydrate() {
    this.publish(Events.BUILD_EVENT(Events.EEVents.ON_FIELD_REHYDRATE, this.#component.name));
  }
}

export default Field;
export type { Field };
