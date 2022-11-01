import React, { ReactElement, useMemo } from 'react';

import { TChildWrapperProps } from './types';
import { getFormInstance, BUILD_EVENT } from 'core';
import { useEffect } from 'react';
import { EEVents } from 'core/events';
import { EFlowLogging } from 'core/events/events.types';
import { useForceUpdate } from './useForceUpdate';

const Field = ({
  children,
  component,
  wrapper,
  propsMapping = {},
  formId,
  onMount,
  onChange,
  onFocus,
  onBlur,
  onRehydrate,
  customWrapper,
}: TChildWrapperProps): ReactElement | null => {
  const [forceChange, dispatchForceChange] = useForceUpdate();
  const [forceRehydrate, dispatchForceRehydrate] = useForceUpdate();
  const [forceBlur, dispatchForceBlur] = useForceUpdate();
  const [forceFocus, dispatchForceFocus] = useForceUpdate();
  const fieldInstance = useMemo(() => getFormInstance(formId).getFieldInstance(component, propsMapping), []);
  const Element = useMemo(() => wrapper, [wrapper]);

  useMemo(() => {
    fieldInstance.publish(BUILD_EVENT(EEVents.ON_FIELD_MOUNT, component.name));
    onMount && onMount(fieldInstance.data);
  }, []);

  // Effects to make the Field -> Form callback flow synchronous

  useEffect(() => {
    if (!forceRehydrate) return;
    onRehydrate(fieldInstance.data);
  }, [forceRehydrate]);

  useEffect(() => {
    if (!forceChange) return;
    onChange(fieldInstance.data);
  }, [forceChange]);

  useEffect(() => {
    if (!forceBlur) return;
    onBlur(fieldInstance.data);
  }, [forceBlur]);

  useEffect(() => {
    if (!forceFocus) return;
    onFocus(fieldInstance.data);
  }, [forceFocus]);

  //Effects to listen to form Events
  useEffect(
    () =>
      fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_REHYDRATE, component.name), () => dispatchForceRehydrate()),
    [],
  );

  useEffect(
    () => fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_BLUR, component.name), () => dispatchForceBlur()),
    [],
  );

  useEffect(
    () => fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_CHANGE, component.name), () => dispatchForceChange()),
    [],
  );

  useEffect(
    () => fieldInstance.subscribe(BUILD_EVENT(EEVents.ON_FIELD_FOCUS, component.name), () => dispatchForceFocus()),
    [],
  );

  fieldInstance.logInfo(EFlowLogging.REACT_FIELD_ADAPTER, '', 'render', { component });
  if (!fieldInstance.data.visible || !fieldInstance.data.mounted) {
    return null;
  }

  if (customWrapper) {
    return customWrapper(component, { ...fieldInstance.data }, <Element {...fieldInstance.props}>{children}</Element>);
  }

  return <Element {...fieldInstance.props}>{children}</Element>;
};

export default Field;
