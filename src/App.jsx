import { useState } from 'react'
import './App.css'
import { traitAndLevels } from './parser';

const inputStr = 'Exert X > List, Blast-1, 1, Acrobatic X, ., 1, Slippery X, ., 3, [Arc X], ., 4, ., ., 0, ., ., 0, [Addicted X > Type], ., 0, ., ., 0, ., ., 0, ., ., 0, ., ., 0, Aura X > List, Acid-1, 0';

function App() {
  let resultStr = traitAndLevels(inputStr);

  return (
    <>
      <h1>Given</h1>
      <code>{inputStr}</code>

      <h1>Output</h1>
      <code>{resultStr}</code>
    </>
  )
}

export default App
