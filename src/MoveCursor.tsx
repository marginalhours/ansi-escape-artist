import React, { useEffect, useState } from 'react';
import { Direction, MovementType } from './constants';
import Label from './Label';
import Radiobutton from './Radiobutton';

const repeatTillMouseUp = (onCallback, onEnd) => {
  let frameHandle;
  let start = undefined; 

  let loop = (now) => {
      start = start || performance.now();
      let elapsed = (now - start) || 0;
      start = now; 

      onCallback(elapsed);

      frameHandle = requestAnimationFrame(loop);
  }

  loop();

  const upListener = document.addEventListener('mouseup', () => { 
    document.removeEventListener('mouseup', upListener);
    cancelAnimationFrame(frameHandle); 
    onEnd(); 
  });
}

function MoveCursor ({ onChange, isActive, movementType }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  let remaining = 0;
  let total = 600;

  useEffect(() => {
    onChange({x: cursorX, y: cursorY, movementType: movementType});
  }, [cursorX, cursorY]);

  const handleMove = (dx: number, dy: number) => {
    repeatTillMouseUp((dt) => {
      remaining -= dt;
      if (remaining <= 0) {
        remaining = total;
        total *= 0.67;
        total = Math.max(total, 100);

        setCursorX(cursorX => cursorX + dx);
        setCursorY(cursorY => cursorY + dy);
      }
    }, () => {});
  }

  const handleReset = () => {
    setCursorX(0);
    setCursorY(0);
  }

  const handleMovementTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const movementType = parseInt(event.target.value) as MovementType;
    if (movementType === MovementType.AbsoluteCursor) {
      setCursorX(Math.max(cursorX, 0));
      setCursorY(Math.max(cursorY, 0));
    }

    onChange({x: Math.max(cursorX, 0), y: Math.max(cursorY, 0), movementType: movementType});
  }

  return (
      <div className="flex flex-row">
        <div className="w-1/2 justify-center items-center flex">
          <div className="block-outer w-28 flex flex-col">
            <div className="relative border rounded-t h-28 w-28 flex justify-center items-center">
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
            <button className="border bg-gray-200 p-2 w-100 rounded-b" onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center" onChange={handleMovementTypeChange}>
          <Radiobutton label="relative" name="cursorMovement" value={MovementType.RelativeCursor} checked={movementType === MovementType.RelativeCursor} />
          <Radiobutton label="absolute" name="cursorMovement" value={MovementType.AbsoluteCursor} checked={movementType === MovementType.AbsoluteCursor} />
        </div>
      </div>
  )
}

export default MoveCursor;