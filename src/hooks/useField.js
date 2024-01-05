import { useState } from "react";

export let useField = ({ as, type, required, placeholder }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    as,
    required,
    type,
    value,
    onChange,
    placeholder
  };
};