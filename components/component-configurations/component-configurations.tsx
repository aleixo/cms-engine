import React, { useMemo, useState } from "react";
import { TComponent, TField, useForm } from "@edirect/form-engine";

import { ComponentFeatures } from "../form-component-features/form-component-features";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { Stack } from "@mui/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FormInput } from "../input/input";

const ComponentConfigurations = ({
  component,
  onSave,
  onClose,
  onDelete,
  onUp,
  onDown,
  propsMapping,
  onClone,
}: {
  component: TComponent & TField;
  onSave(component: TComponent): void;
  onClose(): void;
  onDelete(): void;
  onUp(): void;
  onDown(): void;
}) => {
  const [enabledFormFeatures, setEnabledFormFeatures] = useState(false);
  const FORM_ID = useMemo(() => {
    return component.name;
  }, [component.name]);

  useForm({
    formId: FORM_ID,
    onData: (data) => {
      onSave({ ...component, ...data.formatted });
    },
  });

  const handleFormFeaturesToggleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnabledFormFeatures(event.target.checked);
  };

  return (
    <>
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete();
          }}
        >
          delete
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onUp();
          }}
        >
          Up
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDown();
          }}
        >
          down
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClone();
          }}
        >
          clone
        </Button>
        {(component.children || component.components) && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} id="new">
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Create template
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Create and store the template in the components list, templates
                section
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <FormInput formId="new_template" placeholder="name" />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch onClick={handleFormFeaturesToggleChange} />
                    }
                    label="Weak reference"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch onClick={handleFormFeaturesToggleChange} />
                    }
                    label="Strong reference"
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  Create
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
      <Stack spacing={2}>
        <ComponentPropsForm
          formId={FORM_ID}
          props={propsMapping}
          component={component}
        />
        <FormGroup>
          <FormControlLabel
            control={<Switch onClick={handleFormFeaturesToggleChange} />}
            label="Enable form features"
          />
        </FormGroup>
        {enabledFormFeatures && (
          <ComponentFeatures formId={FORM_ID} component={component} />
        )}
      </Stack>
    </>
  );
};

export { ComponentConfigurations };
