import Field from './Field.js';
import Scope from './Scope.js';
import Base from './Base.js';
import * as Events from '../events/index.js';
import { TComponent, TFormValues, TSchema, TStepData, TComponentPropsMapping } from '../types.js';
declare class Form extends Base {
    #private;
    formData: TFormValues;
    formId: string;
    schema?: TSchema;
    scope: Scope;
    initialValues: Record<string, unknown>;
    steps: Record<number, {
        [x in string]: Field;
    }>;
    constructor(formId: string, observer: Events.Observer, scope: Scope, schema?: TSchema, initialValues?: Record<string, unknown>);
    get step(): TStepData;
    set step(step: TStepData);
    get fields(): {
        [x: string]: Field;
    };
    getFieldInstance(component: TComponent, propsMapping?: TComponentPropsMapping): Field;
    rehydrate(): void;
    destroyField(field: string): void;
}
export default Form;
export type { Form };
