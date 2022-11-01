import React, { useMemo, ReactElement, useRef, useImperativeHandle, useEffect, useContext, useReducer } from 'react';
import { CoreEvents, getFormInstance, TFormRefActions, ALL_NAMESPACE_EVENTS } from 'core';
import { DEFAULT_FORM_ID } from 'core/constants';
import { EEVents } from 'core/events';

import { TFormProps, TComponent } from './types';
import ChildWrapper from './Field';
import Submit from './Submit';
import { FormContext } from './context';

const Form = React.forwardRef<TFormRefActions, TFormProps>(
  (
    {
      autoComplete,
      hooks,
      iVars,
      id = DEFAULT_FORM_ID,
      schema = { components: [] },
      submitOnValidOnly = true,
      initialValues = {},
      className,
      onData,
      onSubmit,
      onBlur,
      onFormMount,
      onFieldMount,
      onStep,
      onFocus,
      onLog,
      onScopeChange,
      onFormRehydrate,
      onFieldRehydrate,
      renderFieldWrapper,
    },
    ref,
  ): ReactElement => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const formRef = useRef<HTMLFormElement>(null);
    const submitRef = useRef<HTMLInputElement>(null);
    const { mapper: Mapper, propsMapping: PropsMapping } = useContext(FormContext);

    const formInstance = useMemo(() => {
      const formInstance = getFormInstance(id, {
        schema,
        newInstance: true,
        initialScope: {
          configs: { ...schema?.configs, enableLogging: !!onLog },
          global: {
            ...schema?.iVars,
            ...iVars,
          },
        },
        initialValues,
      });
      hooks?.preMount && formInstance.subscribe(EEVents.ON_FORM_MOUNT, hooks?.preMount);

      formInstance.publish(EEVents.ON_FORM_MOUNT);

      return formInstance;
    }, []);

    const StepWrapper = useMemo(
      () => (Mapper.step ? (Mapper.step.component as new () => React.Component) : React.Fragment),
      [],
    );
    const Children = useMemo(() => {
      if (!formInstance.step.currentStepSchema) {
        return undefined;
      }

      const generateComponentChildren = (component: TComponent, componentLevel = 0): any => {
        return component.children?.map((component: TComponent, i: number) => {
          const Component = Mapper[component.component as string]?.component as new () => React.Component;

          return (
            <ChildWrapper
              key={`${formInstance.step.index}_${componentLevel}_${component.name}_${component.component}_${i}`}
              component={component}
              wrapper={Component}
              propsMapping={PropsMapping[component.component as string] as Record<string, string>}
              formId={id}
              onMount={(data) => {
                onFieldMount && onFieldMount(formInstance.formData, component, data);
              }}
              customWrapper={renderFieldWrapper}
              onRehydrate={(data) => {
                onFieldRehydrate && onFieldRehydrate(formInstance.formData, component, data);
              }}
              onChange={(data) => {
                onData && onData(formInstance.formData, component, data);
              }}
              onBlur={(data) => {
                onBlur && onBlur(formInstance.formData, component, data);
              }}
              onFocus={(data) => {
                onFocus && onFocus(formInstance.formData, component, data);
              }}
            >
              {Array.isArray(component.children)
                ? generateComponentChildren(component, componentLevel + 1)
                : component.children}
            </ChildWrapper>
          );
        });
      };
      return generateComponentChildren(formInstance.step.currentStepSchema);
    }, [formInstance.step.index, id]);

    useEffect(() => {
      onFormMount && onFormMount(formInstance.formData);
    }, []);

    useEffect(() => {
      formInstance.scope.globalScope = {
        namespace: 'global',
        data: {
          ...schema?.iVars,
          ...iVars,
        },
      };
    }, [JSON.stringify(iVars)]);

    useMemo(
      () =>
        formInstance.subscribe(
          EEVents.ON_FORM_REHYDRATE,
          () => onFormRehydrate && onFormRehydrate(formInstance.formData),
        ),
      [],
    );
    useEffect(() => formInstance.subscribe(EEVents.ON_FORM_REHYDRATE, forceUpdate), []);
    useEffect(() => formInstance.subscribe(EEVents.LOG, ({ data }) => onLog && onLog(data)), []);
    useMemo(
      () =>
        formInstance.subscribe(
          ALL_NAMESPACE_EVENTS(EEVents.ON_SCOPE_CHANGE),
          (data) => onScopeChange && onScopeChange(formInstance.scope.scope, data.data.namespace, data.data.key),
        ),
      [],
    );

    useEffect(
      () =>
        formInstance.subscribe(EEVents.ON_FORM_SUBMIT, ({ data }) => {
          const hookResult = hooks?.preSubmit && hooks?.preSubmit(formInstance.formData);
          if (!formInstance.formData.form.isValid && submitOnValidOnly) return;

          onSubmit &&
            onSubmit(data.event, {
              ...formInstance.formData,
              formatted: { ...formInstance.formData.formatted, ...hookResult },
            });
        }),
      [],
    );

    useEffect(
      () =>
        formInstance.subscribeBulk([CoreEvents.NAVIGATE_STEP_BACK, CoreEvents.NAVIGATE_STEP_FORWARD], () => {
          onStep && onStep(formInstance.formData);
          forceUpdate();
        }),
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        values: () => formInstance.formData,
        stepForward: formInstance.publishFor(CoreEvents.NAVIGATE_STEP_FORWARD),
        stepBack: formInstance.publishFor(CoreEvents.NAVIGATE_STEP_BACK),
        validateForm: formInstance.publishFor(CoreEvents.VALIDATE_FORM),
        submit: () => submitRef.current?.click(),
        schema,
      }),
      [],
    );

    return (
      <form
        className={className}
        ref={formRef}
        autoComplete={autoComplete}
        onSubmit={(event) => {
          event.preventDefault();
          formInstance.publish(CoreEvents.ON_FORM_SUBMIT, { event });
        }}
      >
        <StepWrapper {...formInstance.step.currentStepSchema?.props}>{Children}</StepWrapper>
        <Submit ref={submitRef} />
      </form>
    );
  },
);

//If we do not have schema present loading component if defined and render only when we have schema
const SchemaGuard = React.forwardRef<TFormRefActions, TFormProps>((props, ref): ReactElement => {
  if (!props.schema) return props.renderLoading ? props.renderLoading() : <></>;

  return <Form {...props} ref={ref} />;
});

export default SchemaGuard;
