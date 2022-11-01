import { TFormValues } from 'core';
import Form from 'core/managers/Form';
import * as utils from 'core/utils';
import * as apis from 'core/apis';

export const handler = ({ form }: { form: Form }): TFormValues => {
  const buildFormMessages = (data: Record<string, any>) => {
    if (!form.schema?.messages) {
      return [];
    }
    return Object.keys(form.schema.messages).reduce((acc: string[], key) => {
      const fieldValue = utils.object.getValueByPath(data, key);

      if (!form.schema?.messages || !form.schema?.messages[key]) return acc;
      if (
        form.schema.messages[key].values?.includes(fieldValue as string) ||
        form.schema.messages[key].value === fieldValue ||
        (form.schema.messages[key].required === true && !fieldValue)
      ) {
        return [...acc, form.schema.messages[key].name];
      }

      return acc;
    }, []);
  };

  const areFormValidationsValid = (data: any) => {
    if (!form.schema || !form.schema.validations) return true;
    return !apis.validations.hasError(apis.validations.run(data, form.schema.validations));
  };

  const fieldsData = (fields) =>
    Object.keys(fields).reduce(
      (acc: TFormValues, key) => {
        const field = form.fields[key];
        const fieldValues = field.data;
        if (!field || !field.data.visible || !field.data.name) return acc;

        let group = '';
        if (field.component?.group) {
          group = field.component.group || '';
        }

        const mergedKey = group || key;
        const value =
          typeof fieldValues.value === 'undefined'
            ? form.initialValues[key] || (form.schema?.formattedDataDefaults && form.schema?.formattedDataDefaults[key])
            : fieldValues.value;

        return {
          erroredFields: field.fieldHasError() ? [...acc.erroredFields, key] : acc.erroredFields,
          predictableErroredFields: field.fieldValidationsHaveError()
            ? [...acc.predictableErroredFields, key]
            : acc.predictableErroredFields,
          fields: {
            ...acc.fields,
            [key]: fieldValues,
          },
          filteredFields: form.schema?.filteredFields?.includes(mergedKey)
            ? {
                ...acc.filteredFields,
                ...(typeof value === 'undefined' ? {} : { [mergedKey]: value }),
                ...(group ? { [group]: value ? value : acc.formatted[group] } : {}),
              }
            : acc.filteredFields,
          formatted: {
            ...acc.formatted,
            ...(typeof fieldValues?.value === 'undefined'
              ? {}
              : utils.object.encapsulateIn(acc.formatted, key, fieldValues?.value as string) || { [key]: value }),
            ...(group ? { [group]: value ? value : acc.formatted[group] } : {}),
          },
        };
      },
      {
        predictableErroredFields: [],
        erroredFields: [],
        fields: {},
        formatted: {
          ...form.schema?.formattedDataDefaults,
        },
        filteredFields: {},
      },
    );

  const formData = fieldsData(form.fields);
  const stepData = fieldsData(form.steps[form.step.index] || {});
  const result = {
    ...formData,
    form: {
      scope: form.scope.getGlobalScope(),
      steps: {
        ...form.step,
        data: { [form.step.index]: stepData },
        isValid: !stepData.predictableErroredFields.length,
      },
      isValid: !formData.predictableErroredFields.length && areFormValidationsValid(formData.formatted),
      messages: buildFormMessages({ ...form.initialValues, ...formData.formatted }),
    },
  };

  form.formData = result;
  return result;
};
