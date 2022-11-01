import { CoreEvents } from "@edirect/form-engine/dist/core/events";

export enum EFeatureTypes {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  ARRAY = "array",
}

export type TFeatureConfigurationsPossibleEvents = keyof typeof CoreEvents;
export type TFeatureConfigurationsEvent = {
  label: string;
  event?: TFeatureConfigurationsPossibleEvents;
};

export interface IFormFeature {
  label: string;
  key: string;
  type: EFeatureTypes;
  configurations?: {
    fields?: Record<string, { type: EFeatureTypes }>;
    events?: TFeatureConfigurationsEvent[];
  };
}

const features: IFormFeature[] = [
  {
    label: "Name",
    key: "name",
    type: EFeatureTypes.STRING,
  },
  {
    label: "Group",
    key: "group",
    type: EFeatureTypes.STRING,
  },
  {
    label: "Validations",
    key: "validations",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        email: {
          type: EFeatureTypes.BOOLEAN,
        },
        required: {
          type: EFeatureTypes.BOOLEAN,
        },
      },
      events: [
        {
          label: "Change",
          event: CoreEvents.ON_FIELD_CHANGE,
        },
        {
          label: "Blur",
          event: CoreEvents.ON_FIELD_BLUR,
        },
      ],
    },
  },
  {
    label: "Masks",
    key: "masks",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        cleanMask: {
          type: EFeatureTypes.BOOLEAN,
        },
      },
      events: [
        {
          label: "Focus",
          event: CoreEvents.ON_FIELD_FOCUS,
        },
        {
          label: "Blur",
          event: CoreEvents.ON_FIELD_BLUR,
        },
      ],
    },
  },
  {
    label: "Error messages",
    key: "errorMessages",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        default: {
          type: EFeatureTypes.STRING,
        },
      },
    },
  },
  {
    label: "Filter",
    key: "filter",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        maxLength: {
          type: EFeatureTypes.STRING,
        },
      },
    },
  },
  {
    label: "State",
    key: "state",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        hidden: {
          type: EFeatureTypes.BOOLEAN,
        },
      },
    },
  },
  {
    label: "Formatters",
    key: "formatters",
    type: EFeatureTypes.OBJECT,
    configurations: {
      fields: {
        capitalize: {
          type: EFeatureTypes.BOOLEAN,
        },
      },
      events: [
        {
          label: "Change",
          event: CoreEvents.ON_FIELD_CHANGE,
        },
        {
          label: "Blur",
          event: CoreEvents.ON_FIELD_BLUR,
        },
      ],
    },
  },
  {
    label: "API",
    key: "api",
    type: EFeatureTypes.ARRAY,
    configurations: {
      fields: {
        method: {
          type: EFeatureTypes.STRING,
        },
        url: {
          type: EFeatureTypes.STRING,
        },
        scope: {
          type: EFeatureTypes.STRING,
        },
      },
      events: [
        {
          label: "Change",
          event: CoreEvents.ON_FIELD_CHANGE,
        },
        {
          label: "Blur",
          event: CoreEvents.ON_FIELD_BLUR,
        },
        {
          label: "Mount",
          event: CoreEvents.ON_FIELD_MOUNT,
        },
      ],
    },
  },
];

export { features };
