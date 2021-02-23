import React, { useState } from 'react'
import './App.css'

import Picker from './Picker';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <header className='App-header text-gray-500'>
      </header>
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
      <footer></footer>
    </div>
  )
};

export default App;
