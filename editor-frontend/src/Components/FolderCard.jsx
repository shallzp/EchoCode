import { useState } from 'react'
import { FolderOpen, Folder, Plus, Trash2, Pencil } from 'lucide-react';

import FileCard from './FileCard';

const FolderCard = ({ theme, languageConfig, folder, onEdit, onDelete, onAddFile, onDeleteFile, onEditFile }) => {

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`${theme.surface} rounded-2xl ${theme.shadowLg} ${theme.border} border overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
      {/* header */}
      <div className={`bg-gradient-to-r ${theme.gradient} p-6`}>
        <div className='flex items-center justify-between'>
          <div className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 
              <FolderOpen className="w-8 h-8 text-white group-hover:scale-110 transition-transform" /> : 
              <Folder className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            }

            <div>
              <h2 className="text-2xl font-bold text-white">{folder.title}</h2>
              <p className="text-blue-100 text-sm">{folder.files.length} files</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit(folder)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Pencil className='w-5 h-5' />
            </button>
            <button
              onClick={() => onAddFile(folder.id)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New File</span>
            </button>
            <button
              onClick={() => onDelete(folder.id)}
              className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 hover:scale-105"
              title="Delete folder"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      {isExpanded && (
        <div className="p-6">
          {folder.files.length === 0 ? (
            <div className="text-center py-12">
              <div className={`bg-gradient-to-r ${theme.folderGradient} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Folder className={`w-12 h-12 ${theme.textMuted}`} />
              </div>
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>No files yet</h3>
              <p className={`${theme.textMuted} mb-6`}>Start building something amazing!</p>
              <button
                onClick={() => onAddFile(folder.id)}
                className={`bg-gradient-to-r ${theme.gradient} text-white px-6 py-3 rounded-xl font-medium ${theme.shadowLg} transition-all duration-200 hover:scale-105`}
              >
                Create First File
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6"> {/* grid grid-cols-1 md:grid-cols-2 */}
              {folder.files.map(file => (
                <FileCard
                  theme={theme}
                  languageConfig={languageConfig}
                  key={file.id}
                  file={file}
                  onDelete={(fileId) => onDeleteFile(folder.id, fileId)}
                  onEdit={(file) => onEditFile(folder.id, file)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FolderCard;