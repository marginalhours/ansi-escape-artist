import React, { useEffect, useState, FunctionComponent } from 'react';
import {  MovementType } from './constants';
import Label from './Label';
import Radiobutton from './Radiobutton';



const repeatTillMouseUp = (onCallback: (arg0: number) => void, onEnd: () => void) => {
  let frameHandle: number;
  let start: number | undefined = undefined; 

  let loop = (now: number) => {
      start = start || performance.now();
      let elapsed = (now - start) || 0;
      start = now; 

      onCallback(elapsed);

      frameHandle = requestAnimationFrame(loop);
  }

  loop(performance.now());

  const upListener: any = document.addEventListener('mouseup', () => { 
    document.removeEventListener('mouseup', upListener);
    cancelAnimationFrame(frameHandle); 
    onEnd(); 
  });
}

const arrowClasses = (direction: string, x: number, y: number, movementType: MovementType) => {
  if (movementType === MovementType.AbsoluteCursor){
    switch(direction) {
      case 'top':
        return (y > 0) ? `direction-arrow top` : `direction-arrow top disabled`;
      case 'top-right':
        return (y > 0) ? `direction-arrow top-right` : `direction-arrow top-right disabled`;
      case 'top-left':
        return (y > 0 && x > 0) ? `direction-arrow top-left` : 'direction-arrow top-left disabled';
      case 'left':
        return (x > 0) ? `direction-arrow left`: `direction-arrow left disabled`;
      default:
        return `direction-arrow ${direction}`;
    }
  } else {
    return `direction-arrow ${direction}`;
  }
}

type MoveCursorProps = {
  onChange: ({x, y, movementType}: {x: number, y: number, movementType: MovementType}) => void
  movementType: MovementType
}

const MoveCursor: FunctionComponent<MoveCursorProps> = ({ onChange, movementType }) => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  let remaining = 0;
  let total = 600;
  let originalTotal = 600;

  useEffect(() => {
      onChange({x: cursorX, y: cursorY, movementType: movementType});
  }, [cursorX, cursorY, movementType]);

  const handleMove = (dx: number, dy: number) => {

    repeatTillMouseUp((dt: number) => {
      remaining -= dt;
      if (remaining <= 0) {
        remaining = total;
        total *= 0.67;
        total = Math.max(total, 100);

        setCursorX(cursorX => movementType === MovementType.AbsoluteCursor ? Math.max(cursorX + dx, 0) : cursorX + dx);
        setCursorY(cursorY => movementType === MovementType.AbsoluteCursor ? Math.max(cursorY + dy, 0) : cursorY + dy);
      }
    }, () => {
      total = originalTotal;
      remaining = 0;
    });
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
      <>
        <Label text="Move Cursor" />
        <div className="flex flex-row">
          <div className="w-1/2 justify-center items-center flex">
            <div className="block-outer w-28 flex flex-col">
              <div className="relative border rounded-t h-28 w-28 flex justify-center items-center">
                <output className="displacement select-none">({cursorX}, {cursorY})</output>
                <div onMouseDown={() => handleMove(0, -1)} className={arrowClasses("top", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(1, -1)} className={arrowClasses("top-right", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(1, 0)} className={arrowClasses("right", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(1, 1)} className={arrowClasses("bottom-right", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(0, 1)} className={arrowClasses("bottom", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(-1, 1)} className={arrowClasses("bottom-left", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(-1, 0)} className={arrowClasses("left", cursorX, cursorY, movementType)}>▲</div>
                <div onMouseDown={() => handleMove(-1, -1)} className={arrowClasses("top-left", cursorX, cursorY, movementType)}>▲</div>
              </div>
              <button className="border select-none outline-none focus:outline-none p-2 w-100 rounded-b bg-gray-200 hover:bg-gray-300 active:bg-gray-400" onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center" onChange={handleMovementTypeChange}>
            <Radiobutton label="relative" name="cursorMovement" value={(MovementType.RelativeCursor).toString()} checked={movementType === MovementType.RelativeCursor} />
            <Radiobutton label="absolute" name="cursorMovement" value={(MovementType.AbsoluteCursor).toString()} checked={movementType === MovementType.AbsoluteCursor} />
          </div>
        </div>
      </>
  )
}

export default MoveCursor;