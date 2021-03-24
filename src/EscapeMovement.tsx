import React, { useState } from 'react'

import ActiveBox from './ActiveBox';
import Box from './Box';
import Label from './Label';
import ChangeLine from './ChangeLine';
import OutputEscapeSequence from './OutputEscapeSequence';
import { EscapeType, MovementType, ClearType } from './constants';
import { LanguageType } from './languages';
import { transformMovement } from './transforms';
import MoveCursor from './MoveCursor';
import ClearArea from './ClearArea';
import ScrollScreen from './ScrollScreen';
import Radiobutton from './Radiobutton';

const EscapeMovement = ({languageType, escapeType, setEscapeType}: {languageType: LanguageType, escapeType: EscapeType}) => {
  const [movementType, setMovementType] = useState(MovementType.None);
  const [clearType, setClearType] = useState(ClearType.None);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleCursorChange = ({x, y, movementType}: {x: number, y: number, movementType: MovementType}) => {
    setX(x);
    setY(y);
    if (movementType !== MovementType.None){
      setMovementType(movementType);
    }
  }

  const handleRelativeLineChange = (y: number) => {
    setY(y);
    setMovementType(MovementType.LinesRelative);
  }

  const handleClear = (clearType: ClearType, movementType: MovementType) => {
    setClearType(clearType);
    setMovementType(movementType);
  }

  const handleScroll = (y: number) => {
    setY(y);
    setMovementType(MovementType.Scroll);
  }

  const handleMiscellaneous = (event : React.ChangeEvent<HTMLInputElement>) => {
    const command = parseInt(event.target.value) as MovementType;
    setMovementType(command);
  }

  const transformOptions = {
    movementType: movementType,
    x: x, 
    y: y,
    clearType: clearType,
    languageType: languageType,
    escapeType: escapeType,
  };

  return (
    <main className="flex flex-row w-full p-2">
      <div className="w-1/2 p-2">
        <ActiveBox 
          isActive={movementType === MovementType.AbsoluteCursor || movementType == MovementType.RelativeCursor}
          setActive={() => { setMovementType(MovementType.RelativeCursor); }}
        >
          <MoveCursor
            movementType={movementType}
            onChange={handleCursorChange}
          />
        </ActiveBox>
        <ActiveBox 
          isActive={movementType === MovementType.LinesRelative}
          setActive={() => { setMovementType(MovementType.LinesRelative); }}
        >
          <ChangeLine
            onChange={handleRelativeLineChange}
          />
        </ActiveBox>
        <ActiveBox 
          isActive={movementType === MovementType.Scroll}
          setActive={() => { setMovementType(MovementType.Scroll); }}
        >
          <ScrollScreen
            onChange={handleScroll}
          /> 
        </ActiveBox>
        <ActiveBox 
          isActive={movementType === MovementType.ScreenClear || movementType === MovementType.LineClear}
          setActive={() => { setMovementType(MovementType.ScreenClear); }}
        >
          <ClearArea
            movementType={movementType}
            onChange={handleClear}
          />
        </ActiveBox>
        <ActiveBox 
          isActive={movementType === MovementType.SaveCursor || movementType === MovementType.RestoreCursor || movementType === MovementType.ReportCursor}
          setActive={() => { setMovementType(MovementType.SaveCursor); }}
        >
          <Label text="Miscellaneous"/>
          <div className="inline-block flex justify-between" onChange={handleMiscellaneous}>
            <Radiobutton label="Save cursor position" name="miscellaneous" value={MovementType.SaveCursor} checked={movementType === MovementType.SaveCursor} />
            <Radiobutton label="Restore cursor position" name="miscellaneous" value={MovementType.RestoreCursor} checked={movementType === MovementType.RestoreCursor} />
            <Radiobutton label="Report cursor position" name="miscellaneous" value={MovementType.ReportCursor} checked={movementType === MovementType.ReportCursor} />
          </div>
        </ActiveBox>
      </div>
      <div className="w-1/2 p-2">
          <OutputEscapeSequence
            transform={transformMovement}
            transformOptions={transformOptions}
            escapeType={escapeType}
            setEscapeType={setEscapeType}
          />
      </div>
    </main>
  )
};


export default EscapeMovement;