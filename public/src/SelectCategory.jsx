import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const SelectCategory = () => {
  const categories = [
    {
      value: "drums",
      label: "Drum samples",
    },
    {
      value: "voice",
      label: "Voice samples",
    },
    {
      value: "instrument",
      label: "Instrument samples",
    },
    {
      value: "misc",
      label: "Misc samples",
    },
  ];

  return (
    <div style={{ margin: "10px" }}>
      <TextField
        select
        label="Select Category"
        defaultValue="misc"
        helperText="Please select category"
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default SelectCategory;
