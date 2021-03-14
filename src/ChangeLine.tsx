import React, { useEffect, useState } from 'react';
import { Direction, MovementType } from './constants';
import Label from './Label';
import Radiobutton from './Radiobutton';

function ChangeLine({ onChange, isActive }) {

  const [lineRelativeCount, setLineRelativeCount] = useState(0);
  const [direction, setDirection] = useState<Direction|null>(null);

  const handleLineRelativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value);
    setLineRelativeCount(v);
  }

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value) as Direction;
    setDirection(v);
  }

  useEffect(() => {
    switch(direction){
      case Direction.Up:
        onChange(-lineRelativeCount);
        break;
      case Direction.Down:
        onChange(lineRelativeCount);
        break;
    }
  }, [lineRelativeCount, direction]);

  return (
    <>
      <Label text="Change Line" />
      <div className="flex flex-row justify-center items-center">
        <span className="mr-2">Move cursor to the start of the line</span>
        <input className="inline-block w-12 text-center border-b" type="number" min="0" value={lineRelativeCount} onChange={handleLineRelativeChange} />
        <span className="ml-2 mr-6 inline-block ">lines</span>
        <div className="inline-block" onChange={handleDirectionChange}>
          <Radiobutton label="above" name="lineDirection" value={Direction.Up} checked={direction === "up"} />
          <Radiobutton label="below" name="lineDirection" value={Direction.Down} checked={direction === "down"} />
        </div>
      </div>
    </>
  );
}

export default ChangeLine;