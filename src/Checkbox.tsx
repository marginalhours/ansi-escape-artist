import React, {FunctionComponent} from "react";

type CheckboxProps = {
  checked: boolean,
  label: string,
  onChange: () => void
};

const Checkbox: FunctionComponent<CheckboxProps> = ({ checked, label, onChange }) => {
  return (
    <div className="m-2">
      <label className="flex flex-row text-sm items-center justify-center cursor-pointer select-none">
        <span className="-mr-1">{label}</span>
        <input className="hide-checkbox" type='checkbox' checked={checked} onChange={onChange} />
        <span className="checkbox-target w-5 h-5 rounded border"></span>
      </label>
    </div>
  )
}

export default Checkbox;