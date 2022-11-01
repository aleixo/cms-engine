import React, { ReactElement } from 'react';
import { TComponent } from './types.js';
interface HocProps {
    Comp: (new () => React.Component) | any;
    propsMapping: Record<string, string>;
}
declare type DecoratorProps<OriginalComponentProps = Record<string, unknown>> = OriginalComponentProps & Pick<TComponent, 'validations' | 'masks' | 'rehydrate' | 'clearFields' | 'api' | 'errorMessages' | 'filter' | 'formatters' | 'visibilityConditions'> & {
    formId?: string;
    visibility?: boolean;
    name: string;
    value?: any;
};
declare const asFormField: <OriginalComponentProps>({ Comp, propsMapping }: HocProps) => ({ name, validations, errorMessages, masks, filter, formatters, visibilityConditions, formId, visibility, value, ...props }: DecoratorProps<OriginalComponentProps>) => ReactElement;
export default asFormField;
