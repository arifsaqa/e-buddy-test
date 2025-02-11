import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  type?: string;
  isError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: any;
}

const InputWithLabel = ({
  label,
  isError,
  errorMessage,
  type,
  placeholder,
  defaultValue,
}: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={label}>{label.toUpperCase()}</FormLabel>
      <TextField
        error={isError}
        helperText={errorMessage}
        id={label}
        type={type}
        name={label}
        placeholder={placeholder}
        autoComplete={label}
        autoFocus
        required
        fullWidth
        variant="outlined"
        color={isError ? "error" : "primary"}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default InputWithLabel;
