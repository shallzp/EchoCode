import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Code, Star, Clock, Trash2, Edit3, Play, Save, Download, 
  Upload, Maximize, Copy, Terminal, Eye, EyeOff, RefreshCw, ArrowLeft, HomeIcon } from "lucide-react";

// import FileModal from './FileModal';

const Editor = ({ theme }) => {

  const navigate = useNavigate();

  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // const [openFileModal, setOpenFileModal] = useState(false);
  // const [editingFile, setEditingFile] = useState(null);

  // const handleEditFile = (file) => {
  //   setEditingFile(file);
  //   setOpenFileModal(true);
  // };

  // const handleSaveFile = (updatedFile) => {
  // You’ll place your logic here to update file name in state (or context)
  //   setOpenFileModal(false);
  //   setEditingFile(null);
  // };


  const sampleCode = `#include <iostream>
using namespace std;
  
int main(){
  
  cout << "Hello World !";

  return 0;

}`;

  return (
    <div className="h-full flex-1 flex flex-col">
      {/* <>
        {openFileModal && (
          <FileModal 
            isOpen={openFileModal}
            onClose={() => setOpenFileModal(false)}
            editingFile={editingFile}
            onSave={handleSaveFile}
            theme={theme}
          />
        )}
      </> */}

      {/* Header Controls */}
      <div className={`${theme.surface} ${theme.border} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className={`p-2 rounded-lg ${theme.textMuted} hove:${theme.text} transition-colors flex items-center space-x-2`}>
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center space-x-2">
              <FileText size={20} className="text-blue-500" />
              <h2 className="text-lg font-semibold" onDoubleClick={() => handleEditFile({ id: 1, name: "HelloWorld.cpp" })}>HelloWorld.cpp</h2>
            </div>

            <button className={`px-3 py-1 ${theme.accent} text-white rounded-lg text-sm font-medium transition-colors ${theme.accentHover}`}>
              Save Code
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* language selection */}
            <select
              // value={selectedLanguage}
              // onChange={(e) => setSelectedLanguage(e.target.value)}
             className={`px-3 py-2 ${theme.surface} ${theme.border} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              {/* {languages.map(lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}></option>)} */}
             </select>

            {/* Theme selection */}
            <select
              // value={selectedTheme}
              // onChange={(e) => setSelectedTheme(e.target.value)}
              className={`px-3 py-2 ${theme.surface} ${theme.border} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              {/* {themes.map(themeOption) => (
                <option key={themeOption.value} value={themeOption.value}>{themeOption.label}></option>)} */}
             </select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`${theme.surface} ${theme.border} border-b border-r px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Code Editor</span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowLineNumbers(!showLineNumbers)}
                  className={`p-1 rounded ${theme.textMuted} hover:${theme.text} transition-colors`}>
                  {showLineNumbers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <button className={`p-1 rounded ${theme.textMuted} hover:${theme.text} transition-colors`}>
                  <Maximize size={16} />
                </button>
              </div>
            </div>

            <div className="flex itmes-center space-x-2 text-sm">
              <span className={theme.textMuted}>JavaScript {/* Language */}</span>
              <span className={theme.textMuted}>•</span>
              <span className={theme.textMuted}>UTF-8</span>
              <span className={theme.textMuted}>•</span>
              <span className={theme.textMuted}>Line a, Col b {/* Line number */}</span>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 flex">
            {/* Line Numbers */}
            {showLineNumbers && (
              <div className={`${theme.codeArea} ${theme.textMuted} text-right py-4 px-4 select-none font-mono text-sm border-r ${theme.border} min-w-12`}>
                {sampleCode.split('\n').map((_, index) => (
                  <div key={index} className="h-6 flex items-center justify-end">
                    {index+1}
                  </div>
                ))}
              </div>
            )}

            {/* Code Content */}
            <div className={`flex-1 ${theme.codeArea} overflow-auto`}>
              <div className="p-4">
                <pre className="font-mono text-sm leading-6">
                  <code className={theme.text}>
                    {sampleCode.split('\n').map((line, index) => (
                      <div key={index} className="min-h-6 flex items-start">
                        <span className="whitespace-pre-wrap">
                          {line || ' '}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className={`${theme.surface} ${theme.border} border-t border-r px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <button className={`px-4 py-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors flex items-center space-x-2`}>
                <Maximize size={16} />
                <span className="text-sm">Full Screen</span>
              </button>

              <button className={`px-4 py-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors flex items-center space-x-2`}>
                <Upload size={16} />
                <span className="text-sm">Import Code</span>
              </button>

              <button className={`px-4 py-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors flex items-center space-x-2`}>
                <Download size={16} />
                <span className="text-sm">Export Code</span>
              </button>
            </div>

            <button className={`px-6 py-2 ${theme.accent} text-white rounded-lg font-medium ${theme.accentHover} transition-colors flex items-center space-x-2`}>
              <Play size={16} />
              <span>Run Code</span>
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-96 flex flex-col">
          {/* Input Section */}
          <div className="h-1/2 flex flex-col">
            <div className={`${theme.surface} ${theme.border} border-b px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center space-x-2">
                <Terminal size={16} className="text-green-500" />
                <span className="text-sm font-medium">Input:</span>
              </div>
              
              <button className={`px-3 py-1 ${theme.textMuted} hover:${theme.text} rounded transition-colors flex items-center space-x-1`}>
                <Upload size={14} />
                <span className="text-xs">Import Input</span>
              </button>
            </div>
                    
            <div className={`flex-1 ${theme.codeArea} p-4`}>
              <textarea placeholder="Enter input parameters here..."
                className={`w-full h-full ${theme.codeArea} ${theme.text} font-mono text-sm resize-none focus:outline-none`}
                defaultValue="// Input for fibonacci calculation
        n = 10" />
            </div>
          </div>
        
          {/* Output Section */}
          <div className="h-1/2 flex flex-col">
            <div className={`${theme.surface} ${theme.border} border-b border-t px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Output:</span>
                </div>
          
                <div className="flex items-center space-x-2">
                  <button className={`p-1 ${theme.textMuted} hover:${theme.text} rounded transition-colors`}>
                    <RefreshCw size={14} />
                  </button>
          
                  <button className={`p-1 ${theme.textMuted} hover:${theme.text} rounded transition-colors`}>
                    <Copy size={14} />
                  </button>
          
                  <button className={`px-3 py-1 ${theme.textMuted} hover:${theme.text} rounded transition-colors flex items-center space-x-1`}>
                    <Download size={14} />
                    <span className="text-xs">Export Output</span>
                  </button>
                </div>
              </div>
                    
              <div className={`flex-1 ${theme.codeArea} p-4 overflow-auto`}>
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="text-green-400">
                    {/* {sampleOutput} */}
                  </code>
                </pre>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Editor
