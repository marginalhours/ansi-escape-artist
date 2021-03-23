import React, { useEffect, useState } from 'react';
import Label from './Label';
import Radiobutton from './Radiobutton';

function ChangeLine({ onChange }) {

  const [lineRelativeCount, setLineRelativeCount] = useState(0);
  const [direction, setDirection] = useState(-1);

  const handleLineRelativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value);
    setLineRelativeCount(v);
  }

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value);
    setDirection(v);
  }

  useEffect(() => {
      if (lineRelativeCount > 0){
        onChange(direction * lineRelativeCount); 
      }
  }, [lineRelativeCount, direction]);

  return (
    <>
      <Label text="Change Line" />
      <div className="flex flex-row justify-center items-center">
        <span className="mr-2">Move cursor to start of line</span>
        <input className="inline-block w-12 text-center border-b" type="number" min="0" value={lineRelativeCount} onChange={handleLineRelativeChange} />
        <span className="ml-2 mr-6 inline-block ">lines</span>
        <div className="inline-block" onChange={handleDirectionChange}>
          <Radiobutton label="above" name="lineDirection" value="-1" checked={direction === -1} />
          <Radiobutton label="below" name="lineDirection" value="1" checked={direction === 1} />
        </div>
      </div>
    </>
  );
}

export default ChangeLine;