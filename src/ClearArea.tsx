import React, { useEffect, useState } from 'react';
import { ClearType, MovementType, ClearEntity } from './constants';
import Label from './Label';

function ClearArea ({ onChange, movementType }) {
  const [clearType, setClearType] = useState(ClearType.None);

  const handleClearTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clearType = parseInt(event.target.value) as ClearType;
    setClearType(clearType);
    onChange(clearType, movementType);
  }

  const handleChangeMovementType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const movementType = parseInt(event.target.value) as MovementType;
    onChange(clearType, movementType);
  }

  return (
    <>
      <Label text="Clear" />
      <div className="flex flex-row h-12">
        <select className="inline-block border mt-2 focus:border-none focus:outline-none rounded px-4 py-2 w-1/2 bg-white mr-2" onChange={handleClearTypeChange}>
          <option value={ClearType.None}>Please select...</option>
          <option value={ClearType.FromCursorTillEnd}>From cursor till end of</option>
          <option value={ClearType.FromCursorTillStart}>From cursor till start of</option>
          <option value={ClearType.Entire}>Entire</option>
        </select>
        <select  className="inline-block border mt-2 focus:border-none focus:outline-none rounded px-4 py-2 w-1/2 bg-white" onChange={handleChangeMovementType}>
          <option value={MovementType.None}>please select...</option>
          <option value={MovementType.ScreenClear}>screen</option>
          <option value={MovementType.LineClear}>line</option>
        </select>
      </div>
    </>
  )
}

export default ClearArea;