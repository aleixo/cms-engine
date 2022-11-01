import * as Events from 'core/events';
import * as utils from 'core/utils';

export const handler = ({ form, field }: Events.TEventInformation) => {
  field.data.mounted = true;

  const { props = {} } = field.component;
  const staticInitialSchemaValue = props[field.mappings?.setValue!] as string | number;

  const groupValue = field.component.group && utils.object.getValueByPath(form.initialValues, field.component.group);
  const initialValue =
    utils.object.getValueByPath(
      form.initialValues,
      groupValue === field.component.props?.value && !!groupValue ? field.component.group : field.component.name,
    ) || staticInitialSchemaValue;

  field.value =
    form.formData.form?.steps?.data[form.formData?.form?.steps?.index]?.formatted[field.component.name] || initialValue;
};
