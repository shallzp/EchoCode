import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EditorProvider from './provider/EditorProvider';
import FileProvider from './provider/FileProvider';
import FolderProvider from './provider/FolderProvider';
import ThemeProvider from './provider/ThemeProvider';

import BoxUI from './components/BoxUI';
import HomePage from './components/HomePage';
import Editor from './components/Editor';

function App() {
  return (

    <EditorProvider>
      <FolderProvider>
        <FileProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <BoxUI isHome={true}>
                    <HomePage />
                  </BoxUI>
                }/>

                <Route path="/editor/:fileId/:folderId" element={
                  <BoxUI isHome={false}>
                    <Editor />
                  </BoxUI>
                }/>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </FileProvider>
      </FolderProvider>
    </EditorProvider>
  )
}

export default App
