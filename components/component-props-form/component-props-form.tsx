import FormGroup from "@bit/bolttech.components.common.form-group";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FormCheckbox } from "../checkbox/checkbox";
import { FormInput } from "../input/input";
import { FormSelect } from "../select/select";
import * as S from "./component-props-form.styles";
const ComponentPropsForm = ({ formId, props, component }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} id="new">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Component Props
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Edit component properties according to the mappers
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.keys(props || {}).map((prop, i) => (
          <Stack spacing={2} key={i}>
            <FormGroup fullWidth>
              {props[prop].type === "select" && (
                <>
                  <label>{prop}</label>
                  <FormSelect
                    formId={formId}
                    name={`props.${prop}`}
                    options={props[prop].options.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                  />
                </>
              )}
              {props[prop].type === "boolean" && (
                <>
                  <label>{prop}</label>
                  <FormCheckbox formId={formId} name={`props.${prop}`} />
                </>
              )}
              {props[prop].type === "string" && (
                <FormInput
                  label={prop}
                  formId={formId}
                  name={`props.${prop}`}
                  value={component.props[prop] || ""}
                />
              )}
            </FormGroup>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export { ComponentPropsForm };
