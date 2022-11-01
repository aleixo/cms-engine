import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { ReactElement } from "react";
import * as S from "./component-panel.styles";

type TComponentItem = { label: string };

interface Props {
  components: Record<string, TComponentItem>;
  onComponentClick(component: string): void;
}

const TemplateComponents = ({
  components,
  onComponentClick,
}: Props): ReactElement => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} id="new">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Template components
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {Object.keys(components).map((key, i) => (
            <Button
              variant="outlined"
              draggable
              key={i}
              onClick={() => onComponentClick(key)}
            >
              {components[key].label}
            </Button>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export { TemplateComponents };
