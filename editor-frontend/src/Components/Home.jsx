import { useState } from 'react'
import { Code, FolderPlus, Search, Clock } from 'lucide-react'

import { getLanguageConfig } from '../config/Language'
import folders_data from '../data/Folders'

import FolderUI from './FolderUI';
import AddFolder from './AddFolder';
import FileModal from './FileModal';

const Home = ({ theme, isDarkMode }) => {

  const langConfig = getLanguageConfig(isDarkMode, theme)

  const [folders, setFolders] = useState([
    folders_data
  ]);

  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [editingFile, setEditingFile] = useState(null);

  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Folder Operations  
  const addFolder = (newFolderName) => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        title: newFolderName.trim(),
        files: []
      };
      setFolders([...folders, newFolder]);
      // setNewFolderName('');
    }
  };

  const deleteFolder = (folderId) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
  };

  // File Operations
  const addFile = (folderId) => {
    setCurrentFolderId(folderId);
    setEditingFile(null);
    setOpenFileModal(true);
  };

  const editFile = (folderId, file) => {
    setCurrentFolderId(folderId);
    setEditingFile(file);
    setOpenFileModal(true);
  };

  const saveFile = (fileData) => {
    setFolders(folders.map(folder => {
      if (folder.id === currentFolderId) {
        if (editingFile) {
          return {
            ...folder,
            files: folder.files.map(file =>
              file.id === editingFile.id
                ? { ...file, ...fileData }
                : file
            )
          };
        } else {
          const newFile = {
            id: Date.now(),
            ...fileData
          };
          return {
            ...folder,
            files: [...folder.files, newFile]
          };
        }
      }
      return folder;
    }));

    setOpenFileModal(false);
    setCurrentFolderId(null);
    setEditingFile(null);
  };

  const deleteFile = (folderId, fileId) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          files: folder.files.filter(file => file.id !== fileId)
        };
      }
      return folder;
    }));
  };

  const currentFolder = folders.find(f => f.id === currentFolderId);

  return (
    <div className='h-full flex-1 flex overflow-hidden'>
      {/* Left Panel */}
      <div className={`w-2/5 h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br ${theme.gradient}/10`}>
        <div className="text-center">
          <div className={`w-24 h-24 bg-gradient-to-br ${theme.gradient} rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl`}>
            <Code className="w-12 h12 text-white" />
          </div>

          <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-br ${theme.gradient} bg-clip-text text-transparent`}>EchoCode</h1>

          <p className={`text-lg ${theme.textMuted} mb-8 leading-relaxed`}>
            Create. Compile. Deploy.
            <br />
            Your ideas, your code, your way.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => setOpenAddFolder(true)}
              className={`w-full px-8 py-4 bg-gradient-to-r ${theme.gradient} text-white rounded xl font-semibold hover:bg-gradient-to-r hover:${theme.gradientHover} transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}>
              <FolderPlus size={20} />
              <span>Create New Folder</span>
            </button>          
          </div>
        </div>
      </div>

      <>
        {openAddFolder && (
          <AddFolder
            theme={theme}
            isOpen={openAddFolder}
            onClose={() => setOpenAddFolder(false)}
            onSubmit={(data) => {
            addFolder(data.folderName);
            setOpenAddFolder(false);
          }} />
        )}
      </>

      <>
        {openFileModal && (
          <FileModal 
            theme={theme}
            isOpen={openFileModal}
            onClose={() => setOpenFileModal(false)}
            onSave={saveFile}
            editingFile={editingFile}
            folderName={currentFolder ? currentFolder.title : ''}
          />
        )}
      </>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        {/* Search Header */}
        <div className={`p-6 ${theme.surface} ${theme.border} border-b`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Workspace</h2>
            <button 
              onClick={() => setOpenAddFolder(true)}
              className={`px-4 py-2 ${theme.accent} text-white rounded-lg ${theme.accentHover} transition-colors flex items-center space-x-2`}>
              <FolderPlus size={16} />
              <span>New Folder</span>
            </button>
          </div>

          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
            <input 
              type="text" 
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 ${theme.surface} ${theme.border} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.text}`}
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-6'>
          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Clock size={20} className="text-blue-500" />
              <h3 className="text-lg font-semibold">Recent Projects</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-4">
                {filteredFolders.map(folder => (
                  <FolderUI
                    theme={theme}
                    languageConfig={langConfig}
                    key={folder.id}
                    folder={folder}
                    onDeleteFolder={deleteFolder}
                    onAddFile={addFile}
                    onDeleteFile={deleteFile}
                    onEditFile={editFile}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home