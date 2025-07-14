import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const NewsletterTemplateSelector = ({ selected, setSelected, templateCount = 10 }) => {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Choose Newsletter Template</InputLabel>
      <Select
        value={selected}
        label="Choose Newsletter Template"
        onChange={(e) => setSelected(e.target.value)}
      >
        {Array.from({ length: templateCount }, (_, i) => (
          <MenuItem key={i} value={i}>
            Template {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NewsletterTemplateSelector;
