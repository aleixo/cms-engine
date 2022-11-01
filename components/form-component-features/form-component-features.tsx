import React, { useState } from "react";
import { TComponent } from "@edirect/form-engine";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  InputLabel,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import * as S from "./form-component-features.styles";
import { EFeatureTypes, features } from "./form-component-features.configs";
import { ComponentFeature } from "./form-component-feature";

import { FormSelect } from "../select/select";

interface TPros {
  formId: string;
  component: TComponent;
}

const ComponentFeatures = ({ formId, component }: TPros) => {
  const [selectedFeatures, setSelectedFeatures] = useState(component);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} id="form_features">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Form Features
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Allow to configure several form features. Must be in a form container
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {features.map((feature, i) => (
          <S.FeatureContainer key={i}>
            <InputLabel>{feature.label}</InputLabel>
            {!feature.configurations?.events &&
              feature.type !== EFeatureTypes.OBJECT &&
              feature.type !== EFeatureTypes.ARRAY && (
                <>
                  <ComponentFeature
                    feature={feature}
                    formId={formId}
                    component={component}
                  />
                </>
              )}
            {feature.configurations?.events?.map((event) => (
              <>
                <Divider />
                <InputLabel>{event.label}</InputLabel>
                {feature.type === EFeatureTypes.ARRAY && (
                  <Button
                    onClick={() => {
                      setSelectedFeatures({
                        ...selectedFeatures,
                        [feature.key]: {
                          ...selectedFeatures[feature.key],
                          [event.event]: [
                            ...((selectedFeatures[feature.key] || {})[
                              event.event
                            ] || []),
                            Object.keys(feature.configurations.types).reduce(
                              (acc, key) => {
                                return {
                                  ...acc,
                                  [key]: false,
                                };
                              },
                              {}
                            ),
                          ],
                        },
                      });
                    }}
                  >
                    +
                  </Button>
                )}
                {feature.type === EFeatureTypes.OBJECT && (
                  <FormSelect
                    name={`todelete.${feature.key}.${event.event}`}
                    label="Choose one validation type"
                    onChange={(_, data) => {
                      setSelectedFeatures({
                        ...selectedFeatures,
                        [feature.key]: {
                          ...selectedFeatures[feature.key],
                          [event.event]: {
                            ...(selectedFeatures[feature.key] || {})[
                              event.event
                            ],
                            [data.value]: false,
                          },
                        },
                      });
                    }}
                    options={Object.keys(feature.configurations?.fields).map(
                      (feature) => ({
                        value: feature,
                        label: feature,
                      })
                    )}
                  />
                )}
                {selectedFeatures[feature.key] && (
                  <S.ComponentFeaturesContainer>
                    {Object.keys(
                      selectedFeatures[feature.key][event.event] || {}
                    ).map((validation, i) => {
                      return (
                        <ComponentFeature
                          key={i}
                          event={event}
                          feature={feature}
                          validation={validation}
                          formId={formId}
                          component={component}
                        />
                      );
                    })}
                  </S.ComponentFeaturesContainer>
                )}
              </>
            ))}
          </S.FeatureContainer>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export { ComponentFeatures };
