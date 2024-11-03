import './App.css'

import { useState } from 'react'
import traitAndLevels from './parser';
import inputStr from './sample.input';

function App() {
  const [text, setText] = useState(inputStr);
  const [output, setOutput] = useState(".");

  function handleProcess() {
    const textInput = document.getElementById("inputs").textContent;
    let resultStr = traitAndLevels(textInput);
    setOutput(resultStr);
  }

  function handleReset() {
    setText(inputStr);
    setOutput(".");
  }

  return (
    <div id="application">
      <h1>Given</h1>
      <p>Given a list of trait, target, level, created a nicely formatted string for presentation as a MEST Tactics traits paragraph.</p>
      <textarea id="inputs" value={text} onChange={setText}></textarea>
      <div id="controls">
        <button onClick={handleProcess}>PROCESS</button>
        <button onClick={handleReset}>RESET</button>
      </div>

      <h1>Output</h1>
      <p>Click the PROCESS button to see the formatted result of the input text from above.</p>
      <code>{output}</code>
    </div>
  )
}

export default App
