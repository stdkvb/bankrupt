import { useEffect, useState } from "react";
import { Input, FormControl, TextField, Autocomplete } from "@mui/material";

export default function Select({ name, title, tags, onReset, addSpecilaSing }) {
  const [filter, setFilter] = useState([]);


  const resetFilters = () => {
    setFilter([]);
  };
  useEffect(resetFilters, [onReset]);

  return (
    <FormControl sx={{ width: "100%" }}>
      <Autocomplete
        key={onReset}
        onChange={(event, value) => {
          // добавляет 鰷 вместо запятой. нужно чтобы на бэке строка корректно делилась на массив по запятой 
          if (addSpecilaSing) {
            const valueWithSpeciaSing = value.map((item) => item.replaceAll(',', '鰷'));
            setFilter(valueWithSpeciaSing)
          } else {
            setFilter(value)
          }
        }}
        multiple
        noOptionsText={"Результаты не найдены"}
        limitTags={1}
        size="small"
        options={tags.sort()}
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
