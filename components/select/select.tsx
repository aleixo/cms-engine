import { MenuItem, Select } from "@mui/material";
import { asFormField } from "@edirect/form-engine";

const ReactSelect = (
  props: React.ComponentProps<typeof Select> & {
    options: { value: string; label: string }[];
  }
) => (
  <Select fullWidth {...props}>
    {props.options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

const FormSelect = asFormField<React.ComponentProps<typeof ReactSelect>>({
  Comp: ReactSelect,
  propsMapping: {
    getValue: "onChange",
    setValue: "value",
  },
});

export { FormSelect };
