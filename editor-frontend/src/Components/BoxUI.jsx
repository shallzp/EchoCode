import { useNavigate } from "react-router-dom";
import { Code, Sun, Moon, Settings, Coffee, Home } from "lucide-react";

const BoxUI = ({ theme, isHome, isDarkMode, setIsDarkMode, children }) => {
  
  const navigate = useNavigate();

  return (
    <div className={`h-screen bg-gradient-to-br ${theme.background} p-6 flex items-center justify-center`}>
      <div className={`w-full mac-w-7xl h-full ${theme.bg} ${theme.text} flex flex-col font-sans overflow-hidden rounded-2xl shadow-2xl border ${theme.border} backdrop-blur-sm bg-opacity-95`}>

        {/* Mac Window Title*/}
        <div className={`${theme.surface} px-6 py-4 flex items-center justify-between select-none border-b ${theme.border}`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"></button>
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"></button>
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"></button>
            </div>
          </div>

          <div className="absolte left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            <div className={`w-6 h-6 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center`}>
              <Code className="w-4 h-4 text-white" />
            </div>

            <h1 className={`text-sm font-medium ${theme.textMuted}`}>
              {isHome ? 'EchoCode' : 
              'HelloWorld.cpp' // File Name
              }
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {!isHome && (
              <button 
                onClick={() => navigate("/")}
                className={`p-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors`}>
                <Home size={18} />
              </button>
            )}

            <button onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className={`p-2 rounded-lg ${theme.textMuted} hover:${theme.text} transition-colors`}>
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <div className={`${theme.surface} ${theme.border} border-t px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <span className={`${theme.textMuted} flex items-center space-x-2`}>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{isHome ? 'Ready to code' : 'Ready'}</span>
              </span>

              {isHome ? (
                <span className={`${theme.textMuted}`}>{/* Logic */} 4 projects </span>
              ) : (
                <>
                  <span className={theme.textMuted}>{/* Language */} JavaScript</span>
                  <span className={theme.textMuted}>UTF-8</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm">
              {isHome ? (
                <button 
                  className={`${theme.textMuted} hover:${theme.text} transition-colors flex items-center space-x-1`}>
                  <Coffee size={16} />
                  <span>Tips & Tricks</span>
                </button>
              ) : (
                <span className={theme.textMuted}>Line a, Column b</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BoxUI