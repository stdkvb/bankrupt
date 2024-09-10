import { useState, useCallback, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
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
  const [value, setValue] = useState(defaultValue || null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const debouncedSave = useCallback(
    debounce((newValue) => {
      if (name === "companyAddress") {
        api
          .getDadataAddress(newValue)
          .then((data) => {
            setOptions(data.suggestions || []);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api
          .getDadataCompany(newValue)
          .then((data) => {
            setOptions(data.suggestions || []);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500),
    [name]
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <Autocomplete
      disabled={readOnly}
      freeSolo
      noOptionsText={"Результаты не найдены"}
      disableClearable
      options={options}
      inputValue={inputValue}
      value={value}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        updateValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          setValue(newValue);
          setInputValue(newValue?.value || "");
          handleDadata(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          name={name}
          size="medium"
          fullWidth
          required={!readOnly && required}
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
          {option.data?.inn}
          <br />
          {option.data?.address?.value}
        </li>
      )}
      filterOptions={(options, { inputValue }) => {
        const sanitizedInput = inputValue.replace(/["']/g, "");
        return options.filter((option) => {
          const normalizedInput = sanitizedInput.toLowerCase();
          const valueToCheck =
            name === "inn" && option.data?.inn ? option.data.inn : option.value;
          return valueToCheck
            .replace(/["']/g, "")
            .toLowerCase()
            .includes(normalizedInput);
        });
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        const label =
          name === "inn" && option.data?.inn
            ? option.data.inn
            : option?.value || "";
        return label;
      }}
    />
  );
}
