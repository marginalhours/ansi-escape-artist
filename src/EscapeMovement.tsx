import React, { useState } from 'react'

import Box from './Box';
import Label from './Label';
import ChangeLine from './ChangeLine';
import OutputEscapeSequence from './OutputEscapeSequence';
import { EscapeType, Language, MovementType, ClearType } from './constants';
import { transformMovement } from './transforms';
import MoveCursor from './MoveCursor';
import ClearArea from './ClearArea';

const EscapeMovement = () => {
  const [language, setLanguage] = useState(Language.Python3);
  const [escapeType, setEscapeType] = useState(EscapeType.Octal)
  const [movementType, setMovementType] = useState(MovementType.None);
  const [clearType, setClearType] = useState(ClearType.None);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleCursorChange = ({x, y, movementType}: {x: number, y: number, movementType: MovementType}) => {
    setX(x);
    setY(y);
    setMovementType(movementType);
  }

  const handleRelativeLineChange = (y: number) => {
    setY(y);
    setMovementType(MovementType.LinesRelative);
  }

  const handleClear = (clearType: ClearType, movementType: MovementType) => {
    setClearType(clearType);
    setMovementType(movementType);
  }

  const transformOptions = {
    movementType: movementType,
    x: x, 
    y: y,
    clearType: clearType,
    language: language,
    escapeType: escapeType,
  };

  return (
    <main className="flex flex-row">
      <div className="w-1/2 p-2">
        <Box>
          <Label text="Move Cursor" />
          <MoveCursor 
            isActive={movementType === MovementType.AbsoluteCursor || movementType == MovementType.RelativeCursor}
            movementType={movementType}
            onChange={handleCursorChange}
          />
        </Box>
        <Box>
          <ChangeLine 
            isActive={movementType === MovementType.LinesRelative}
            onChange={handleRelativeLineChange}
          />
        </Box>
        <Box>
          <ClearArea
            isActive={movementType === MovementType.ScreenClear || movementType === MovementType.LineClear}
            movementType={movementType}
            onChange={handleClear}
          />
        </Box>
        <Box>
          <Label text="Scroll" />
        </Box>
      </div>
      <div className="w-1/2 p-2">
        <Box>
          <OutputEscapeSequence
            transform={transformMovement}
            transformOptions={transformOptions}
            escapeType={escapeType}
            setEscapeType={setEscapeType}
          />
        </Box>
      </div>
    </main>
  )
};


export default EscapeMovement;