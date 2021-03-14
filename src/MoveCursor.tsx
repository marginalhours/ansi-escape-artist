import React, { useEffect, useState } from 'react';
import { Direction, MovementType } from './constants';
import Label from './Label';
import Radiobutton from './Radiobutton';

function MoveCursor ({ onChange, isActive, movementType }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const handleMove = (dx: number, dy: number) => {
    
    setCursorX(cursorX + dx);
    setCursorY(cursorY + dy);
  }

  const handleMovementTypeChange = () => {}

  return (
      <div className="flex flex-row">
        <div className="w-1/2 justify-center items-center">
          <div className="relative border rounded h-24 w-24 flex justify-center items-center">
            <output className="displacement">({cursorX}, {cursorY})</output>
            <div onMouseDown={() => handleMove(0, -1)} className="direction-arrow top">▲</div>
            <div onMouseDown={() => handleMove(1, -1)} className="direction-arrow top-right">▲</div>
            <div onMouseDown={() => handleMove(1, 0)} className="direction-arrow right">▲</div>
            <div onMouseDown={() => handleMove(1, 1)} className="direction-arrow bottom-right">▲</div>
            <div onMouseDown={() => handleMove(0, 1)} className="direction-arrow bottom">▲</div>
            <div onMouseDown={() => handleMove(-1, 1)} className="direction-arrow bottom-left">▲</div>
            <div onMouseDown={() => handleMove(-1, 0)} className="direction-arrow left">▲</div>
            <div onMouseDown={() => handleMove(-1, -1)} className="direction-arrow top-left">▲</div>
          </div>
        </div>
        <div className="w-1/2" onChange={handleMovementTypeChange}>
          <Radiobutton label="relative" name="lineDirection" value={MovementType.RelativeCursor} checked={movementType === MovementType.RelativeCursor} />
          <Radiobutton label="absolute" name="lineDirection" value={MovementType.AbsoluteCursor} checked={movementType === MovementType.AbsoluteCursor} />
        </div>
      </div>
  )
}

export default MoveCursor;