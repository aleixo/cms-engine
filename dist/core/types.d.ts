import { ReactElement } from 'react';
import { ICustomValidationValue } from './apis/validations.js';
import { EEVents, TEventInformation } from './events/index.js';
export type { TEventsKeys, TObserverData } from './events/events.types.js';
export declare type TScopeNamespaces = 'global' | 'api' | 'hooks' | 'fields' | 'configs';
export declare type TSetGlobalScope = {
    namespace: TScopeNamespaces;
    key?: string;
    data: any;
    merge?: boolean;
};
export declare type TScope = {
    global?: any;
    api?: any;
    hooks?: any;
    configs?: any;
    fields?: any;
};
export declare type TMapper = Record<string, Record<string, unknown>>;
export declare type TMaskGeneric = {
    to: number;
    from: number;
    mask: string;
}[];
declare type TCurrencyMask = {
    locale: string;
    currency: string;
};
export declare type TComponentMasks = {
    generic?: TMaskGeneric;
    cardNumber?: boolean;
    hideCardNumber?: boolean;
    cardMask?: boolean;
    cardDate?: boolean;
    currencyMask?: TCurrencyMask;
    feinMask?: boolean;
    replaceAll?: string | number;
};
declare type TFormMessages = Record<string, {
    name: string;
    value?: any;
    values?: string[];
    required?: boolean;
}>;
export declare type TChildRefActions = {
    fieldHasError(errors?: TErrors): boolean;
    value(): TFormData;
    validate(errors?: TErrors): boolean;
    fieldValidationsHaveError(setErrorMessages?: boolean): boolean;
    setFieldData(value: TField): void;
    component: TComponent;
    rehydrate(component: TComponent): void;
};
export declare type TChildrenOptions = {
    childrenScope?: string[];
    blurredChildren?: string[];
    changedChildren?: string[];
    scopeBlurredChildren?: boolean;
    scopeChangedChildren?: boolean;
};
export declare type TFieldData = Record<string, TField>;
export declare type TChildWrapperProps = {
    children: ReactElement;
    component: TComponent;
    wrapper: new () => React.Component;
    propsMapping: Record<string, string>;
    onMount(values: TField): void;
    onChange(values: TField): void;
    onBlur?(values: TField): void;
    errors?: TErrors;
    value?: string;
    visible?: boolean;
    formId: string;
};
export declare type TFormRefActions = {
    submit(): void;
    stepForward(): TFormValues;
    stepBack(): TFormValues;
    validateForm(opts?: TChildrenOptions): Promise<TFormValues>;
    values(opts: Pick<TChildrenOptions, 'scopeBlurredChildren' | 'scopeChangedChildren' | 'childrenScope'>): TFormValues;
};
export declare type THookPayload = {
    setScope(data: TSetGlobalScope): void;
};
export declare type THookFunction = (formData: TFormValues) => Record<string, unknown>;
export declare type THooks = {
    preMount?: () => Record<string, unknown>;
    preUnmount?: () => Record<string, unknown>;
    preSubmit?: (formData: TFormValues) => Record<string, unknown>;
    posSubmit?: (formData: TFormValues) => Record<string, unknown>;
};
export declare type Obj = {
    [key in string]: Obj;
};
export declare type TIVars = Record<string, unknown>;
export declare enum TAvailableHooks {
    'preMount' = "preMount",
    'preUnmount' = "preUnmount",
    'preSubmit' = "preSubmit",
    'postSubmit' = "postSubmit"
}
export declare type TField = {
    value?: string | number | boolean;
    errors?: TErrors;
    visible?: boolean;
    failedErrorMessages?: string[];
    mask?: string;
    changed?: boolean;
    blured?: boolean;
    focused?: boolean;
    name: string;
    mounted: boolean;
    metadata?: any;
    schemaLocation?: {
        step: number;
        depth: number;
        index: number;
    };
};
export declare type TFormData = {
    value: string;
    errors: Record<string, TErrors>;
    visible: boolean;
};
declare type TPathError = Omit<TSchemaValidation, 'path'> & {
    path?: string;
    paths?: string[];
    preventUnMountValidation?: boolean;
};
export declare type TSchemaValidation = {
    length?: number;
    greaterThan?: number | string;
    regex?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    onlyLetters?: boolean;
    value?: string | number | boolean;
    notEmpty?: boolean;
    callback?(value: string | number): {
        fail: boolean;
        errorMessage?: string;
    };
    numericRange?: {
        start: number | string;
        end: number | string;
    };
    isNumber?: boolean;
    hasNoExtraSpaces?: boolean;
    email?: boolean;
    lessThan?: number | string;
    sequentialNumber?: boolean;
    repeatedNumbers?: boolean;
    url?: boolean;
    path?: TPathError;
    isCreditCard?: string[];
    isCreditCardAndLength?: string[];
    isCreditCodeMatch?: {
        numberCard: string;
        availableOptions: string[];
    };
    customValidation?: ICustomValidationValue[];
    notAllowSpaces?: true;
    isInTheList?: string[] | number[] | string;
};
export declare type TStepData = {
    navigated: boolean;
    index: number;
    data: Record<number, Pick<TFormValues, 'fields' | 'erroredFields' | 'formatted' | 'filteredFields'>>;
    currentStepSchema?: TComponent;
    isValid: boolean;
    numSteps?: number;
};
export declare type TFormValues = {
    predictableErroredFields: string[];
    erroredFields: string[];
    fields: TFieldData;
    formatted: Record<string, unknown>;
    filteredFields?: Record<string, unknown>;
    form: {
        steps: TStepData;
        isValid: boolean;
        messages: string[];
        scope: TScope;
    };
};
export declare type TError = {
    value: unknown;
    message?: string;
    fail: boolean;
};
export declare type TErrors = Record<string, TError> | undefined;
export declare type TErrorMessages = Record<string, string>;
export declare type TSchemaValidations = TSchemaHandler<TSchemaValidation>;
export declare type TOptions = {
    id: string;
    label: string;
    value: string;
};
declare type TSchemaHandler<T> = Partial<Record<EEVents.ON_FIELD_CHANGE | EEVents.ON_FIELD_BLUR | EEVents.ON_FIELD_MOUNT | EEVents.ON_FIELD_FOCUS, T>>;
export declare type TSchemaRehydrate = {
    validations: TSchemaValidation;
    fields: string[];
}[];
export declare type TSchemaVisibilityConditions = {
    validations: TSchemaValidation;
    fieldName?: string;
    fieldNames?: string[];
}[];
export declare type TSchemaClearFields = {
    validations?: TSchemaValidation;
    fields: string[];
    clearedValue: string | number | boolean;
}[];
export declare type TSchemaApi = {
    debounceTime?: number;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH';
    url: string;
    headers?: HeadersInit | undefined;
    body?: Record<string, any>;
    scope?: string;
    blockRequestWhenInvalid?: boolean;
}[];
export declare type TSchemaMasks = {
    cleanMask?: boolean;
} & TComponentMasks;
export declare type TEventReducedSchema = {
    api: TSchemaApi;
    clearFields: TSchemaClearFields;
    /**
     *
     * @deprecated - Rehydrate can be accomplished with template binding (eg: ${targetvalue})
     */
    rehydrate: TSchemaRehydrate;
    formatters: TSchemaFormatters;
    masks: TSchemaMasks;
    validations: TSchemaValidation;
    visibilityConditions: TSchemaVisibilityConditions;
};
export declare type TComponent = {
    name: string;
    component: string;
    metadata?: Record<string, any>;
    group?: string;
    wrapper?: new () => React.Component;
    children?: TComponent[];
    errorMessages?: TErrorMessages;
    type?: 'text' | 'number' | string;
    state?: {
        hidden?: boolean;
    };
    props?: Record<string, unknown>;
    validations?: TSchemaHandler<Pick<TEventReducedSchema, 'validations'>['validations']>;
    filter?: Pick<TEventReducedSchema, 'validations'>['validations'];
    rehydrate?: TSchemaHandler<Pick<TEventReducedSchema, 'rehydrate'>['rehydrate']>;
    visibilityConditions?: TSchemaHandler<Pick<TEventReducedSchema, 'visibilityConditions'>['visibilityConditions']>;
    clearFields?: TSchemaHandler<Pick<TEventReducedSchema, 'clearFields'>['clearFields']>;
    api?: TSchemaHandler<Pick<TEventReducedSchema, 'api'>['api']>;
    masks?: Partial<Record<EEVents.ON_FIELD_BLUR | EEVents.ON_FIELD_MOUNT | EEVents.ON_FIELD_FOCUS, Pick<TEventReducedSchema, 'masks'>['masks']>>;
    formatters?: TSchemaHandler<Pick<TEventReducedSchema, 'formatters'>['formatters']>;
};
export declare type TStep = {
    component: string;
    name: string;
    children: TComponent[];
    props?: Record<string, string>;
};
export declare type TComponentPropsMapping = {
    getValue?: string;
    setValue?: string;
    setErrorMessage?: string;
    onBlur?: string;
};
export declare type TPropsMapping = Record<string, TComponentPropsMapping>;
export declare type TFormLevelErrors = Pick<TSchemaValidation, 'path'>;
export declare type TPageSchema = TComponent[];
export declare type TSchema = {
    configs?: TConfigs;
    messages?: TFormMessages;
    validations?: TFormLevelErrors;
    formattedDataDefaults?: Record<string, unknown>;
    propsMapping?: TPropsMapping;
    components: TStep[];
    filteredFields?: string[];
    iVars?: TIVars;
};
export declare type TSplitterFormatterValue = {
    value: string;
    position: number;
}[];
export declare type TSchemaFormatters = {
    splitter?: TSplitterFormatterValue;
    capitalize?: boolean;
    gapsCreditCard?: string[];
};
export declare type TConfigs = {
    observables?: {
        templates?: {
            exclude?: string[];
        };
    };
};
export declare type TFlowType = {
    [x: string]: {
        events: (component?: TComponent) => EEVents[];
        handler: (args: TEventInformation) => void;
    }[];
};
