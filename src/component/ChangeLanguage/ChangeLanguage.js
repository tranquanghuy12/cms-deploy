import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../redux/ChangeLanguage/ChangeLanguageSlice";

export default function ChangeLanguage() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setLang(event.target.value));
  };

  const lang = useSelector((state) => state.i18n.lang);
  const supportedLangs = useSelector((state) => state.i18n.supportedLangs);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Language</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={lang}
        label="Language"
        onChange={handleChange}
      >
        {Object.entries(supportedLangs).map(([code, name]) => (
          <MenuItem value={code} key={code}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
