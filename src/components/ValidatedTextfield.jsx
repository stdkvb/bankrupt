import React, { useState } from "react";
import { TextField } from "@mui/material";

const ValidatedTextField = ({ label, validator }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
  };
  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      variant="standard"
      size="medium"
      fullWidth
      sx={{ mb: 2 }}
    />
  );
};

export default ValidatedTextField;
