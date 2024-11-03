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

  function handleEdit(e) {
    const value = e.target.value || "";
    setText(value);
  }

  return (
    <>
      <div id="title">MEST Tactics :: Excel Parser</div>
      <div id="application">
        <h1>Given</h1>
        <p>Given a list of trait, target, level, created a nicely formatted string for presentation as a <em>MEST Tactics</em> traits paragraph.</p>
        <textarea id="inputs" value={text} onChange={handleEdit}></textarea>
        <div id="controls">
          <button onClick={handleProcess}>PROCESS</button>
          <button onClick={handleReset}>RESET</button>
        </div>

        <h1>Output</h1>
        <p>Click the <strong>PROCESS</strong> button to see the formatted result of the input text from above.</p>
        <code>{output}</code>
      </div>
    </>
  )
}

export default App
