import { useState, useCallback, useEffect } from "react";
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
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedSave = useCallback(
    debounce((newValue) => {
      if (name == "companyAddress") {
        api
          .getDadataAddress(newValue)
          .then((data) => {
            setOptions(data.suggestions);
          })
          .catch((error) => {
            console.log(error);
          }),
          100;
      } else {
        api
          .getDadataCompany(newValue)
          .then((data) => {
            setOptions(data.suggestions);
          })
          .catch((error) => {
            console.log(error);
          }),
          100;
      }
    }),
    []
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <Autocomplete
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
        handleDadata(newValue);
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
          {option.data.address && option.data.address.value}
        </li>
      )}
      getOptionLabel={(option) =>
        (name == "inn" && option.data ? option.data.inn : option.value) ??
        option
      }
    />
  );
}
