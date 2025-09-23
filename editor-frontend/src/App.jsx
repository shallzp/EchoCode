import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getTheme } from './theme/Theme'

import BoxUI from './Components/BoxUI';
import Home from './Components/Home';
import Editor from './Components/Editor';
import { FileProvider } from './Providers/FileProvider';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isHome, setIsHome] = useState(true)
  const [isEditor, setIsEditor] = useState(false)

  const theme = getTheme(isDarkMode) 

  return (

    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <BoxUI 
              theme={theme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              isHome={isHome}
              setIsHome={setIsHome} //true
              isEditor={isEditor} >

              <Home 
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
              isEditor={!isEditor} >

              <Editor theme={theme}/>

            </BoxUI>
          } />
        </Routes>
      </BrowserRouter>
    </FileProvider>
  )
}

export default App
