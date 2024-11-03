import { useState } from 'react'
import './App.css'
import traitAndLevels from './parser';
import inputStr from './sample.input';

function handleClick(givenStr){
  let resultStr = traitAndLevels(givenStr);
}

function App() {
  return (
    <div id="application">
      <h1>Given</h1>
      <textarea>{inputStr}</textarea>
      <button onClick={handleClick(inputStr)}>PROCESS</button>

      <h1>Output</h1>
      <code>.</code>
    </div>
  )
}

export default App
