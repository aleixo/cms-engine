import { asFormField } from "@edirect/form-engine";
import { Checkbox } from "@mui/material";

const FormCheckbox = asFormField<React.ComponentProps<typeof Checkbox>>({
  Comp: Checkbox,
  propsMapping: {
    getValue: "onChange",
    setValue: "checked",
  },
});

export { FormCheckbox };
