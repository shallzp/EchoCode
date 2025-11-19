import { useState, useContext } from 'react'
import { Code, FolderPlus, Search, Clock } from 'lucide-react'

import { getLanguageConfig } from '../config/Language'
import { EditorContext } from '../provider/EditorProvider';

import FolderCard from './FolderCard';
import FolderModal from './FolderModal';
import FileModal from './FileModal';

const HomePage = ({ theme, isDarkMode }) => {
const {
    folders, addFolder, editFolder, deleteFolder,
    addFile, editFile, deleteFile,
    currentFolderId, setCurrentFolderId,
    editingFolder, setEditingFolder,
    editingFile, setEditingFile,
  } = useContext(EditorContext);

  const langConfig = getLanguageConfig(isDarkMode, theme)

  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Folder modal handlers
  const handleAddFolder = () => {
    setEditingFolder(null);
    setOpenFolderModal(true);
  };

  const handleEditFolder = (folder) => {
    setEditingFolder(folder);
    setOpenFolderModal(true);
  };

  const handleSaveFolder = ({ folderName }) => {
    if (!editingFolder) {
      addFolder(folderName);
    } else {
      editFolder(editingFolder.id, folderName);
    }
    setOpenFolderModal(false);
    setEditingFolder(null);
  };



  // File modal handlers
  const handleAddFile = folderId => {
    setCurrentFolderId(folderId);
    setEditingFile(null);
    setOpenFileModal(true);
  };

  const handleEditFile = (folderId, file) => {
    setCurrentFolderId(folderId);
    setEditingFile(file);
    setOpenFileModal(true);
  };

  const handleSaveFile = fileData => {
    if (editingFile) {
      editFile(currentFolderId, editingFile.id, fileData);
    } else {
      addFile(currentFolderId, fileData);
    }
    setOpenFileModal(false);
    setCurrentFolderId(null);
    setEditingFile(null);
  };

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
              onClick={() => setOpenFolderModal(true)}
              className={`w-full px-8 py-4 bg-gradient-to-r ${theme.gradient} text-white rounded xl font-semibold hover:bg-gradient-to-r hover:${theme.gradientHover} transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}>
              <FolderPlus size={20} />
              <span>Create New Folder</span>
            </button>          
          </div>
        </div>
      </div>

      <>
        {openFolderModal && (
          <FolderModal
            theme={theme}
            isOpen={openFolderModal}
            onClose={() => setOpenFolderModal(false)}
            onSave={handleSaveFolder}
            editingFolder={editingFolder}
          />
        )}
      </>

      <>
        {openFileModal && (
          <FileModal 
            theme={theme}
            isOpen={openFileModal}
            onClose={() => setOpenFileModal(false)}
            onSave={handleSaveFile}
            editingFile={editingFile}
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
              onClick={handleAddFolder}
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
                  <FolderCard
                    theme={theme}
                    languageConfig={langConfig}
                    key={folder.id}
                    folder={folder}
                    onEdit={() => handleEditFolder(folder)}
                    onDelete={() => deleteFolder(folder.id)}
                    onAddFile={() => handleAddFile(folder.id)}
                    onEditFile={handleEditFile}
                    onDeleteFile={deleteFile}
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

export default HomePage;