import React, { useState } from 'react';
import Label from './Label';
import Radiobutton from './Radiobutton';

function ChangeLine({ }) {

  const [lineRelativeCount, setLineRelativeCount] = useState(0);
  const [direction, setDirection] = useState("");

  const handleLineRelativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineRelativeCount(parseInt(event.target.value));
  }

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(event.target.value);
  }

  return (
    <>
      <Label text="Change Line" />
      <div className="flex flex-row justify-center items-center">
        <span className="mr-2">Move cursor to the start of the line</span>
        <input className="inline-block w-12 text-center border-b" type="number" min="0" value={lineRelativeCount} onChange={handleLineRelativeChange} />
        <span className="ml-2 mr-6 inline-block ">lines</span>
        <div className="inline-block" onChange={handleDirectionChange}>
          <Radiobutton label="Above" name="lineDirection" value="up" checked={direction === "up"} />
          <Radiobutton label="Below" name="lineDirection" value="down" checked={direction === "down"} />
        </div>
      </div>
    </>
  );
}

export default ChangeLine;