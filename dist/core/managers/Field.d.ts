import * as Events from '../events/index.js';
import { TField, TComponent, TErrors, TComponentPropsMapping, TEventReducedSchema } from '../types.js';
import Scope from './Scope.js';
import Base from './Base.js';
declare class Field extends Base {
    #private;
    scope: Scope;
    constructor(observer: Events.Observer, component: TComponent, propsMapping: TComponentPropsMapping, scope: Scope);
    get value(): any;
    set value(value: any);
    get component(): TComponent;
    get data(): TField;
    set data(data: TField);
    get isVisible(): boolean | undefined;
    set visibility(visible: boolean);
    get scopedComponent(): TComponent;
    set scopedComponent(component: TComponent);
    get errors(): TErrors;
    set errors(errors: TErrors);
    get props(): Record<string, unknown> | undefined;
    get mappings(): TComponentPropsMapping;
    getFieldErrorMessages(data?: TField): string[];
    fieldHasError(errors?: TErrors): boolean;
    fieldValidationsHaveError(setErrorMessages?: boolean): boolean;
    /**
     *
      Calculates and returns the version of the current scoped object for a given event
     */
    eventReducedSchema(event: Events.TEventsKeys): TEventReducedSchema;
    rehydrate(): void;
}
export default Field;
export type { Field };
