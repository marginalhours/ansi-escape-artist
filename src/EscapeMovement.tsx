import React, { useState } from 'react'

import Box from './Box';
import Label from './Label';
import ChangeLine from './ChangeLine';
import OutputEscapeSequence from './OutputEscapeSequence';

const EscapeMovement = () => {

  return (
    <main className="flex flex-row">
      <div className="w-1/2 p-2">
        <Box>
          <Label text="Move Cursor" />
        </Box>
        <Box>
          <ChangeLine />
        </Box>
        <Box>
          <Label text="Clear" />
        </Box>
      </div>
      <div className="w-1/2 p-2">
        <Box>
          <OutputEscapeSequence
            transform={() => { }}
            transformOptions={{}}
          />
        </Box>
      </div>
    </main>
  )
};


export default EscapeMovement;