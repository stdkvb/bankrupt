import { useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";

import api from "../utils/Api";

export default function AutocompleteDadata({
  name,
  label,
  readOnly,
  required,
  defaultValue,
  handleDadata,
}) {
  const [value, setValue] = useState(defaultValue ? defaultValue : null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedSave = useCallback(
    debounce(
      (newValue) =>
        api
          .getDadata(newValue)
          .then((data) => {
            setOptions(data.suggestions);
          })
          .catch((error) => {
            console.log(error);
          }),
      100
    ),
    []
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <Autocomplete
      sx={{ width: { xs: "100%", md: "300px" } }}
      disabled={readOnly}
      freeSolo
      disableClearable
      options={options}
      value={value}
      onInputChange={(input) => {
        if (input) {
          updateValue(input.target.value);
        }
      }}
      onChange={(event, newValue) => {
        handleDadata(newValue.data);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          name={name}
          size="medium"
          fullWidth
          required={readOnly ? false : required}
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      renderOption={(props, option, i) => (
        <li key={i} {...props}>
          {option.value}
          <br />
          {option.data.inn}
          <br />
          {option.data.address.value}
        </li>
      )}
      getOptionLabel={(option) => option.value ?? option}
    />
  );
}
