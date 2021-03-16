import React, { useEffect, useState } from 'react';
import { ClearType, MovementType, ClearEntity } from './constants';
import Label from './Label';
import Radiobutton from './Radiobutton';

function ClearArea ({ onChange, isActive, movementType }) {
  const [clearType, setClearType] = useState(ClearType.None);

  const handleClearTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clearType = parseInt(event.target.value) as ClearType;
    setClearType(clearType);
    onChange(clearType, movementType);
  }

  const handleChangeMovementType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const movementType = parseInt(event.target.value) as MovementType;
    onChange(clearType, movementType);
  }

  return (
    <>
      <Label text="Clear" />
      <div className="flex flex-row h-28">
        <div className="w-1/4 flex flex-col justify-start items-start h-full " onChange={handleChangeMovementType}>
          <Radiobutton label="screen" name="clearEntity" value={MovementType.ScreenClear} checked={movementType === MovementType.ScreenClear} />
          <Radiobutton label="line" name="clearEntity" value={MovementType.LineClear} checked={movementType === MovementType.LineClear} />
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start h-full border-l" onChange={handleClearTypeChange}>
          <Radiobutton label="from cursor to end" name="clearType" value={ClearType.FromCursorTillEnd} checked={clearType === ClearType.FromCursorTillEnd} />
          <Radiobutton label="from cursor to start" name="clearType" value={ClearType.FromCursorTillStart} checked={clearType === ClearType.FromCursorTillStart} />
          <Radiobutton label="entire" name="clearType" value={ClearType.Entire} checked={clearType === ClearType.Entire} />
        </div>
      </div>
    </>
  )
}

export default ClearArea;