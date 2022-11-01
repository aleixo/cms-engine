import { ReactElement } from 'react';
import {
  TComponent,
  TErrorMessages,
  TSchemaValidation,
  TSchemaValidations,
  TSchema,
  THooks,
  TIVars,
  TFormValues,
  TField,
  TChildrenOptions,
  TPropsMapping,
  TComponentPropsMapping,
  TScope,
  TPageSchema,
} from 'core/types';
import { TLoggingEvent } from 'core/events/events.types';

type TFormProps = {
  hooks?: THooks;
  id?: string;
  iVars?: TIVars;
  initialValues?: Record<string, unknown>;
  schema?: TSchema;
  autoComplete?: string;
  className?: string;
  onSubmit?(
    form: HTMLFormElement,
    values: TFormValues,
  ): Promise<Record<string, unknown> | void> | Record<string, unknown> | void;
  onData?(values: TFormValues, component?: TComponent, field?: TField): void;
  onBlur?(values: TFormValues, component?: TComponent, field?: TField): void;
  onFocus?(values: TFormValues, component?: TComponent, field?: TField): void;
  onFieldMount?(values: TFormValues, component?: TComponent, field?: TField): void;
  onStep?(values: TFormValues): void;
  onLog?(log: TLoggingEvent): void;
  onScopeChange?(scope: TScope, namespace: string, key: string): void;
  onFormRehydrate?(values: TFormValues): void;
  onFieldRehydrate?(values: TFormValues, component: TComponent, field: TField): void;
  renderLoading?(): ReactElement;
  onFormMount?(values: TFormValues): void;
  children?: ReactElement | ReactElement[];
  formattedDataDefaults?: Record<string, unknown>;
  submitOnValidOnly?: boolean;
  onDrop?(values: TFormValues, component: TComponent, field: TField): void;
  onDragStart?(values: TFormValues, component: TComponent, field: TField): void;
  renderFieldWrapper?(component: TComponent | TSchema, field: TField | any, children: ReactElement): ReactElement;
};

type TMapper = Record<
  string,
  {
    component: any;
    label?: string;
  }
>;

type TProvider = {
  children?: ReactElement | ReactElement[] | string;
  mapper: TMapper;
  propsMapping: TPropsMapping;
};
type TContext = {
  mapper: TMapper;
  propsMapping: TPropsMapping;
};

type TChildWrapperProps = {
  children: ReactElement | ReactElement[];
  component: TComponent;
  wrapper: new () => React.Component;
  propsMapping: TComponentPropsMapping;
  formId?: string;
  onMount(values: TField): void;
  onChange(values: TField): void;
  onRehydrate(values: TField): void;
  onFocus(values: TField): void;
  onBlur(values: TField): void;
  customWrapper?(component: TComponent, field: TField, children: ReactElement): ReactElement;
};

export type TPageProps = {
  schema: TPageSchema;
  renderFieldWrapper?(component: TComponent, field: TField, children: ReactElement): ReactElement;
};

type TFormRefActions = {
  submit(): void;
  stepForward(): TFormValues;
  stepBack(): TFormValues;
  validateForm(opts?: TChildrenOptions): TFormValues;
  values(opts: Pick<TChildrenOptions, 'scopeBlurredChildren' | 'scopeChangedChildren' | 'childrenScope'>): TFormValues;
};

export type {
  TComponent,
  TMapper,
  TChildrenOptions,
  TFormValues,
  TFormRefActions,
  TChildWrapperProps,
  TContext,
  TFormProps,
  TProvider,
  TErrorMessages,
  TSchemaValidation,
  TSchemaValidations,
};
