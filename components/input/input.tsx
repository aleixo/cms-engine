import { TextField } from "@mui/material";
import { asFormField } from "@edirect/form-engine";

const FormInput = asFormField<React.ComponentProps<typeof TextField>>({
  Comp: TextField,
  propsMapping: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "errorMessage",
    onBlur: "onBlur",
    onFocus: "onFocus",
  },
});

export { FormInput };
