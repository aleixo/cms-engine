import React, { ReactElement, useEffect, useMemo } from 'react';

import { BUILD_EVENT, getFormInstance } from 'core';
import { DEFAULT_FORM_HOOK_ID } from 'core/constants';
import { EEVents } from 'core/events';

import { TComponent } from './types';
import { useForceUpdate } from './useForceUpdate';

interface HocProps {
  Comp: (new () => React.Component) | any;
  propsMapping: Record<string, string>;
}

type DecoratorProps<OriginalComponentProps = Record<string, unknown>> = OriginalComponentProps &
  Pick<
    TComponent,
    | 'validations'
    | 'masks'
    | 'rehydrate'
    | 'clearFields'
    | 'api'
    | 'errorMessages'
    | 'filter'
    | 'formatters'
    | 'visibilityConditions'
  > & {
    formId?: string;
    visibility?: boolean;
    name: string;
    value?: any;
  };

const asFormField =
  <OriginalComponentProps,>({ Comp, propsMapping }: HocProps) =>
  ({
    name,
    validations,
    errorMessages,
    masks,
    filter,
    formatters,
    visibilityConditions,
    formId = DEFAULT_FORM_HOOK_ID,
    visibility = true,
    value,
    ...props
  }: DecoratorProps<OriginalComponentProps>): ReactElement => {
    const [, forceUpdate] = useForceUpdate();
    const component: TComponent = useMemo(
      () => ({
        state: {
          hidden: !visibility,
        },
        component: '',
        name: name,
        validations,
        errorMessages,
        masks,
        filter,
        visibilityConditions,
        formatters,
      }),
      [errorMessages, name, filter, formatters, masks, validations, visibilityConditions],
    );
    const fieldInstance = useMemo(() => getFormInstance(formId).getFieldInstance(component, propsMapping), []);

    useMemo(() => {
      fieldInstance.subscribeBulk(
        [BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component.name), BUILD_EVENT(EEVents.ON_FIELD_REHYDRATE, component.name)],
        forceUpdate,
      );
    }, []);

    useMemo(() => {
      fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_CHANGE, component.name), ({ data }) => {
        forceUpdate();
        props[propsMapping.getValue] && props[propsMapping.getValue](data.event, fieldInstance.data);
      });
    }, [props[propsMapping.getValue]]);

    useMemo(() => {
      fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_BLUR, component.name), ({ data }) => {
        forceUpdate();
        props[propsMapping.onBlur] && props[propsMapping.onBlur](data.event);
      });
    }, [props[propsMapping.onBlur]]);

    useMemo(() => {
      fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_FOCUS, component.name), ({ data }) => {
        forceUpdate();
        props[propsMapping.onFocus] && props[propsMapping.onFocus](data.event);
      });
    }, [props[propsMapping.onFocus]]);

    useEffect(() => {
      if (typeof value === 'undefined') return;
      fieldInstance.value = value;
      fieldInstance.rehydrate();
    }, [value]);

    useEffect(() => {
      fieldInstance.visibility = visibility;
      fieldInstance.rehydrate();
    }, [visibility]);

    if (!fieldInstance.data.visible) {
      return <></>;
    }

    return <Comp {...props} {...fieldInstance.props} />;
  };

export default asFormField;
