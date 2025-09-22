import { Trash2, Edit3 } from 'lucide-react';

const FileCard = ({ theme, languageConfig, file, onDelete, onEdit }) => {

  const config = languageConfig[file.language?.toLowerCase()] || languageConfig.default;
  
  return (
    <div className={`relative group ${config.bg} ${config.border} border-2 rounded-xl p-4 ${theme.shadowLg} ${theme.hoverScale} ${theme.cardHover} transform transition-all duration-300 cursor-pointer`}>
      {/* language badge */}
      <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${config.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
        {file.language}
      </div>

      {/* icon and content */}
      <div className='flex items-start justify-between'>
        <div className='flex items-start space-x-3'>
          <div className={`p-3 bg-gradient-to-r ${config.color} text-white rounded-lg shadow-md`}>
            <config.icon className="w-5 h-5" />
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className={`font-bold ${theme.text} text-lg mb-1 truncate`}>{file.name}</h3>
            <div className={`${theme.textMuted} flex items-center space-x-2 text-sm`}>
              <span className={theme.textMuted}>{file.language}</span>
              <span className={theme.textMuted}>•</span>
              <span className={theme.textMuted}>{file.lastModified}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(file); }}
            className={`p-2 ${theme.surface} hover:bg-blue-50 text-blue-600 rounded-lg ${theme.shadow} transition-colors`}
            title="Edit file"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
            className={`p-2 ${theme.surface} hover:bg-red-50 text-red-600 rounded-lg ${theme.shadow} transition-colors`}
            title="Delete file"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileCard