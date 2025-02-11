import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  type?: string;
  isError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: any;
  onChangeHandler?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  value?: any;
}

const InputWithLabel = ({
  label,
  isError,
  errorMessage,
  type,
  placeholder,
  defaultValue,
  value,
  onChangeHandler,
}: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={label}>{label}</FormLabel>
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
        sx={{
          background: "transparent",
        }}
        onChange={onChangeHandler}
        value={value}
      />
    </FormControl>
  );
};

export default InputWithLabel;
