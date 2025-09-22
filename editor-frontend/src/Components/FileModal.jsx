import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'

import CustomDropdown from './CustomDropdown';

const languageOptions = [
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
];

const FileModal = ({ theme, isOpen, onClose, onSave, editingFile, folderName }) => {
  
  const [name, setName] = useState(editingFile?.name || '');
  const [language, setLanguage] = useState(editingFile?.language || '');

  useEffect(() => {
    if (editingFile) {
      setName(editingFile.name);
      setLanguage(editingFile.language);
    } else {
      setName('');
      setLanguage('');
    }
  }, [editingFile]);

  const handleSave = () => {
    if (name.trim() && language.trim()) {
      onSave({ name: name.trim(), language: language.trim() });
      setName('');
      setLanguage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200'>
      <div className={`${theme.surface} rounded-2xl p-8 w-full max-w-md shadow-2xl transform animate-in zoom-in duration-200 ${theme.border} border`}>
        <div className='text-center mb-6'>
          <div className={`bg-gradient-to-r ${theme.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Plus className='w-8 h-8 text-white' />
          </div>
            
          <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
            {editingFile ? 'Edit File' : 'Create New File'}
          </h2>
          
          <p className={theme.textMuted}>in {folderName}</p>
        </div>

        <div className='space-y-6'>
          <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-2`}>File Name</label>
                
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 ${theme.surface} ${theme.border} border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${theme.text}`}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>Programming Language</label>
    
            <CustomDropdown
                theme={theme}
                value={language}
                onChange={setLanguage}
                options={languageOptions}
                placeholder="Select Language"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 ${theme.textMuted} ${theme.codeArea} ${theme.cardHover} rounded-xl font-medium transition-colors`}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 px-6 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-xl font-medium ${theme.shadowLg} transition-all duration-200 hover:scale-105`}>
            {editingFile ? 'Update' : 'Create'} File
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileModal
