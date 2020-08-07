import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace("", "").toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {label};
      <select
        id={id}
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={(event) => setState(event.target.value)}
        disabled={options.length === 0}
      >
        <option>ALL</option>
        {options.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
        ;
      </select>
    </label>
  );
  return [state, Dropdown, setState];
};

export default useDropdown;
