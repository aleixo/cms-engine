import { TComponent } from "@edirect/form-engine";
import { FormCheckbox } from "../checkbox/checkbox";
import { FormInput } from "../input/input";
import {
  EFeatureTypes,
  IFormFeature,
  TFeatureConfigurationsEvent,
} from "./form-component-features.configs";

interface IProps {
  feature: IFormFeature;
  formId: string;
  component: TComponent;
  event?: TFeatureConfigurationsEvent;
  validation?: string | Record<any, any>;
}

enum EComponentTypes {
  INPUT = "INPUT",
  BOOLEAN = "BOOLEAN",
}

const ComponentFeature = ({
  event,
  feature,
  validation,
  formId,
  component,
}: IProps) => {
  const buildFieldName = (opts = { index: undefined }) => {
    const fieldNames = {
      ARRAY_FEATURE: () =>
        `${feature.key}.${event?.event}.[${opts?.index}]${
          validation ? "." + validation : ""
        }`,
      CONFIGURED_EVENTS: () =>
        `${feature.key}${event?.event ? "." + event?.event : ""}${
          validation ? "." + validation : ""
        }`,
      NO_CONFIGURED_EVENTS: () =>
        `${feature.key}${validation ? "." + validation : ""}`,
    };

    if (feature.type === EFeatureTypes.ARRAY) {
      return fieldNames.ARRAY_FEATURE();
    }

    if (feature.configurations?.events) {
      return fieldNames.CONFIGURED_EVENTS();
    }

    if (!feature.configurations?.events) {
      return fieldNames.CONFIGURED_EVENTS();
    }

    return "";
  };

  const extractFieldValueFromComponent = () => {
    const hasNoConfigurationFields = !feature.configurations?.fields;

    const hasConfigurationFields =
      !hasNoConfigurationFields &&
      (feature.configurations?.fields[validation]?.type ===
        EFeatureTypes.NUMBER ||
        feature.configurations?.fields[validation]?.type ===
          EFeatureTypes.STRING);

    return hasConfigurationFields
      ? component[feature.key][validation]
      : component[feature.key];
  };

  const render = (validation) => {
    const fieldName = buildFieldName();
    const fieldValue = extractFieldValueFromComponent();

    if (feature.type === EFeatureTypes.OBJECT) {
      return (
        <FormInput
          fullWidth
          formId={formId}
          name={fieldName}
          label={validation}
          placeholder={validation}
          value={fieldValue}
        />
      );
    }

    if (
      feature.type === EFeatureTypes.STRING ||
      feature.type === EFeatureTypes.NUMBER
    ) {
      return (
        <FormInput
          fullWidth
          formId={formId}
          name={fieldName}
          label={validation}
          placeholder={validation}
          value={fieldValue}
        />
      );
    }

    if (feature.type === EFeatureTypes.BOOLEAN) {
      return (
        <div>
          <label>{validation}</label>
          <FormCheckbox
            formId={formId}
            name={fieldName}
            label={validation}
            value={fieldValue}
          />
        </div>
      );
    }

    return <></>;
  };

  if (typeof validation === "object") {
    return (
      <>
        {Object.keys(validation).map((key, i) => (
          <div key={i + key + validation}>
            {render(key, `${feature.key}.${event.event}[${i}].${key}`)}
          </div>
        ))}
        <br />
      </>
    );
  }
  return render(validation);
};

export { ComponentFeature };
