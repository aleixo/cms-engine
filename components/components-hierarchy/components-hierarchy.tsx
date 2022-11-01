import { TComponent, TSchema } from "@edirect/form-engine";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import * as schema from "../../common/schema";
import * as S from "./components-hierarchy.styles";

const ComponentsHierarchy = ({ configuredSchema, selected, overed }) => {
  const render = () => {
    const components = [];
    schema.transverseSchema(
      configuredSchema,
      0,
      (component: TComponent, index, currDepth) => {
        components.push(
          <S.Item
            padding={currDepth.toString()}
            selected={selected?.id === component[index].id}
            overed={overed?.id === component[index].id}
          >
            <p>
              - {component[index].component}/{component[index].name}
            </p>
          </S.Item>
        );
      }
    );
    return components;
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} id="new">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Components hierarchy
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {configuredSchema && render().map((comp) => <>{comp}</>)}
      </AccordionDetails>
    </Accordion>
  );
};

export { ComponentsHierarchy };
