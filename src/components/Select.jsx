import * as React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { matchSorter } from "match-sorter";
import TextField from "@mui/material/TextField";

export default function Select({ name, title, tags, onReset }) {
  const [filter, setFilter] = React.useState([]);

  const resetFilters = () => {
    setFilter([]);
  };
  React.useEffect(resetFilters, [onReset]);

  //sort tags
  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue);

  return (
    <FormControl sx={{ width: "100%" }}>
      <Autocomplete
        key={onReset}
        onChange={(event, value) => setFilter(value)}
        multiple
        limitTags={1}
        size="small"
        filterOptions={filterOptions}
        options={tags}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-tag": {
            maxWidth: "150px",
          },
        }}
      />
      <Input type="hidden" name={name} value={filter} />
    </FormControl>
  );
}
