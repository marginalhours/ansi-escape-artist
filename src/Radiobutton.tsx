import React from "react";

function Radiobutton({ label, name, value, checked }) {
  return (
    <div className="ml-5 inline-block -ml-1 my-2">
      <label className="flex flex-row text-sm items-center justify-center cursor-pointer select-none">
        <input className="hide-radio" type="radio" value={value} name={name} />
        <span className="radio-target w-5 h-5 rounded-full border"></span>
        <span className="ml-2">{label}</span>
      </label>
    </div>)
};

export default Radiobutton;