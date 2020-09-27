import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {//label represents what the hook is used for.default state is default value and options are what options you want to pass to user.
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace("", "").toLowerCase()}`;//removes the space and converts all upercase characters to lower case.
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
        {options.map((item) => {//passes in values that we want to view as options for every abstract hook we pass into our custom hook.
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
