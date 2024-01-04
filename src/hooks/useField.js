import { useState } from "react";

export let useField = ({ type, required, placeholder }) => {
  let [value, setValue] = useState("");

  let onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    required,
    type,
    value,
    onChange,
    placeholder
  };
};