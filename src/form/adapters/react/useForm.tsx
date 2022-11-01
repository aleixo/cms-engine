import { useEffect, useCallback, useRef, useMemo } from 'react';

import { TChildrenOptions, TFormValues } from './types';

import { getFormInstance, ALL_NAMESPACE_EVENTS } from 'core';
import { DEFAULT_FORM_HOOK_ID } from 'core/constants';
import { EEVents } from 'core/events';

type TProps = {
  formId?: string;
  onValid?(data: TFormValues): void;
  onData?(data: TFormValues): void;
  onSubmit?(data: TFormValues | { data: TFormValues }): void;
};

type THookReturn = {
  submitForm(): void;
  formData(opts?: TChildrenOptions): TFormValues;
  configs: { formId: string };
};

const useForm = ({ onValid, onData, onSubmit, formId = DEFAULT_FORM_HOOK_ID }: TProps): THookReturn => {
  const formInstance = useMemo(() => getFormInstance(formId), []);
  const formRef = useRef<{ values: TFormValues }>(null);

  const onDataChange = useCallback(() => {
    const data = formInstance.formData;
    if (data.form?.isValid !== formRef?.current?.values?.form?.isValid) {
      onValid && onValid(data);
    }
    onData && onData(data);
  }, [onData, onValid]);

  useEffect(
    () => formInstance.subscribe(ALL_NAMESPACE_EVENTS(EEVents.ON_FIELD_CHANGE), onDataChange),
    [onData, onValid],
  );

  useEffect(
    () => formInstance.subscribe(ALL_NAMESPACE_EVENTS(EEVents.ON_FIELD_REHYDRATE), onDataChange),
    [onData, onValid],
  );

  useEffect(
    () => formInstance.subscribe(EEVents.ON_FORM_SUBMIT, () => onSubmit && onSubmit(formInstance.formData)),
    [onSubmit],
  );

  const submitForm = () => formInstance.publish(EEVents.ON_FORM_SUBMIT);

  const configs = {
    formId: formInstance.formId,
  };

  return { submitForm, formData: () => formInstance.formData, configs };
};

export default useForm;
