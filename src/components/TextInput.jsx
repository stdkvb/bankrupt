import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const TextInput = ({
  name,
  label,
  defaultValue,
  validator,
  readOnly,
  multiline,
  required,
  reset,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const [error, setError] = useState(false);

  //reset value
  useEffect(() => {
    if (reset == true) {
      setValue("");
    }
  }, [reset]);

  //default validator
  const defaultValidator = (value) => {
    if (value.length < 1) return "Обязательное поле";
    return false;
  };

  //email validator
  const emailValidator = (value) => {
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
      return "Введите корректный email";
    return false;
  };

  //phone validator
  const phoneValidator = (value) => {
    if (
      !/^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        value
      )
    )
      return "Введите корректный номер телефона";
    return false;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator
      ? validator(newValue)
      : name == "email"
      ? emailValidator(newValue)
      : name == "phone"
      ? phoneValidator(newValue)
      : required
      ? defaultValidator(newValue)
      : null;
    setValue(newValue);
    setError(errorMessage);
  };

  if (name == "phone")
    return (
      <InputMask
        mask="+7 (999) 999-99-99"
        value={value}
        onChange={handleChange}
        disabled={readOnly}
      >
        <TextField
          variant="standard"
          name={name}
          size="medium"
          fullWidth
          required={readOnly ? false : required}
          label={label}
          error={!!error}
          helperText={error}
          InputLabelProps={{ shrink: true }}
          sx={{ width: { xs: "100%", md: "300px" } }}
        />
      </InputMask>
    );
  else
    return (
      <TextField
        variant="standard"
        name={name}
        size="medium"
        fullWidth
        required={readOnly ? false : required}
        label={label}
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        disabled={readOnly}
        multiline={multiline}
        minRows={4}
        InputLabelProps={{ shrink: true }}
        sx={{ width: { xs: "100%", md: "300px" } }}
      />
    );
};

export default TextInput;
