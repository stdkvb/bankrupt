import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 220,
      width: 250,
      paddingLeft: 8,
    },
    className: "custom-select",
  },
};

export default function MultipleSelectChip({ name, title, tags }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel
        id="demo-multiple-name-label"
        sx={{ transform: "translate(0, -1.5px) scale(0.75)" }}
      >
        {title}
      </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input name={name} id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", gap: 1, overflow: "hidden" }}>
            {selected.map((value) => (
              <Chip size="small" key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {tags.map((tag, i) => (
          <MenuItem
            key={i}
            value={tag}
            sx={{
              mr: 1,
              mb: 1,
              height: 32,
              minHeight: "unset",
              p: 0,
              borderRadius: 16,
            }}
          >
            <Chip label={tag} onDelete={() => {}}></Chip>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
