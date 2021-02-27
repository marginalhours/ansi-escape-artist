import React, { useState } from 'react'

import Picker from './Picker';

const EscapeMovement = () => {
return (
  <main>
    <select>
      <option value='-1'>Select a preset...</option>
    </select>
    <input type='text' placeholder='Enter your text...'></input>
    <label>Foreground:</label> <Picker></Picker>
    <label>Background:</label> <Picker></Picker>
    <label>Bold</label><input type='checkbox'></input>
    <label>Underline</label><input type='checkbox'></input>
    <output>Sequence</output>
    <output>Preview</output>
  </main>
  )
};


export default EscapeMovement;