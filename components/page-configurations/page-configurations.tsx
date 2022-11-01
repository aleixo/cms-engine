import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "@edirect/form-engine";
import { createBin, deleteBin } from "../../common/json-bin";
import { init } from "../../common/schema";
import { FormInput } from "../input/input";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

const PageConfigurations = ({ page }) => {
  const router = useRouter();

  const { submitForm } = useForm({
    formId: "new_page",
    onSubmit: async (data) => {
      const res = await createBin(
        init({ configs: data.formatted.configs }),
        data.formatted.configs.name
      );
      router.push(`/builder?id=${res.metadata?.id}`);
    },
  });

  const onRemovePageClick = useCallback(async () => {
    await deleteBin(router.query.id);
    router.push(`/builder`);
  }, [router]);

  return (
    <div>
      {page && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Name" secondary={page.configs.name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Url" secondary={page.configs.url} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Vacation"
              secondary={page.configs.description}
            />
          </ListItem>
        </List>
      )}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} id="new">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            New/clone
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Add page or clone this
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormInput
            formId="new_page"
            label="Name"
            name="configs.name"
            placeholder="Page name"
          />
          <FormInput
            formId="new_page"
            label="Url"
            name="configs.url"
            placeholder="Page url"
          />
          <FormInput
            formId="new_page"
            label="Description"
            name="configs.description"
            placeholder="Page description"
          />
        </AccordionDetails>
        <Button onClick={submitForm}>Add</Button>
        <Button onClick={submitForm}>Clone this content</Button>
      </Accordion>
      {router.query.id && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} id="new">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Page details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Edit current page details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              endIcon={<Delete />}
              variant="outlined"
              fullWidth
              color="error"
              onClick={onRemovePageClick}
            >
              REMOVE PAGE
            </Button>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export { PageConfigurations };
