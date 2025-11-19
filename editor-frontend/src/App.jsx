import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getTheme } from './theme/Theme'

import EditorProvider from './provider/EditorProvider';

import BoxUI from './components/BoxUI';
import HomePage from './components/HomePage';
import Editor from './components/Editor';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isHome, setIsHome] = useState(true)

  const theme = getTheme(isDarkMode) 

  return (

    <EditorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <BoxUI 
              theme={theme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isHome={isHome}
              setIsHome={setIsHome} //true
            >

              <HomePage 
                theme={theme}
                isDarkMode={isDarkMode}
              />

            </BoxUI>
          } />

          <Route path="/editor" element={
            <BoxUI 
              theme={theme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isHome={!isHome}
              setIsHome={setIsHome}  //false
            >

              <Editor theme={theme}/>

            </BoxUI>
          } />
        </Routes>
      </BrowserRouter>
    </EditorProvider>
  )
}

export default App
