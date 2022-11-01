import Field from '../managers/Field.js';
import { Form } from '../managers/Form.js';
import { TEventReducedSchema } from '../types.js';
export declare type TEventInformation = TObserverData & {
    eventReducedSchema: TEventReducedSchema;
    form: Form;
    field: Field;
    coreEvent: TEventsKeys;
};
export declare const enum EEVents {
    ON_FIELD_MOUNT = "ON_FIELD_MOUNT",
    ON_FIELD_CHANGE = "ON_FIELD_CHANGE",
    ON_FIELD_BLUR = "ON_FIELD_BLUR",
    ON_FIELD_FOCUS = "ON_FIELD_FOCUS",
    ON_FIELD_REHYDRATE = "ON_FIELD_REHYDRATE",
    RUN_FIELD_VALIDATIONS = "RUN_FIELD_VALIDATIONS",
    RUN_FIELD_MASKS = "RUN_FIELD_MASKS",
    RUN_FIELD_FORMATTERS = "RUN_FIELD_FORMATTERS",
    ON_SCOPE_CHANGE = "ON_SCOPE_CHANGE",
    ON_FORM_SUBMIT = "ON_FORM_SUBMIT",
    ON_FORM_MOUNT = "ON_FORM_MOUNT",
    ON_FORM_UN_MOUNT = "ON_FORM_UN_MOUNT",
    ON_FORM_REHYDRATE = "ON_FORM_REHYDRATE",
    NAVIGATE_STEP_FORWARD = "NAVIGATE_STEP_FORWARD",
    NAVIGATE_STEP_BACK = "NAVIGATE_STEP_BACK",
    VALIDATE_FORM = "VALIDATE_FORM",
    LOG = "LOG"
}
export declare type TEventsKeys = keyof typeof EEVents;
export declare const CoreEvents: Record<TEventsKeys, TEventsKeys>;
export declare type TObserverData = {
    data: any;
    event: TEventsKeys;
    namespace: string;
    payload: any;
};
export declare enum EFlowLogging {
    OBSERVER = "OBSERVER",
    REACT_FIELD_ADAPTER = "REACT FIELD ADAPTER",
    FIELD_HANDLER = "FIELD HANDLER"
}
export declare type TLoggingEvent = {
    level: 'error' | 'info';
    data?: any;
    flow: EFlowLogging;
    action: string;
    error?: any;
};
