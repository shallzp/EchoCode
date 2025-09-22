import { Coffee, Code2, FileText, Zap, Settings } from "lucide-react";

export const getLanguageConfig = (isDarkMode, theme) => {
    
  return {
    java: { 
      icon: Coffee, 
      color: 'from-orange-500 to-red-500', 
      bg: isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50', 
      border: isDarkMode ? 'border-orange-500/30' : 'border-orange-200' 
    },
    cpp: { 
      icon: Code2, 
      color: theme.gradient, 
      bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50', 
      border: isDarkMode ? 'border-blue-500/30' : 'border-blue-200' 
    },
    python: { 
      icon: FileText, 
      color: 'from-green-500 to-emerald-500', 
      bg: isDarkMode ? 'bg-green-900/20' : 'bg-green-50', 
      border: isDarkMode ? 'border-green-500/30' : 'border-green-200' 
    },
    javascript: { 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-500', 
      bg: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50', 
      border: isDarkMode ? 'border-yellow-500/30' : 'border-yellow-200' 
    },
    typescript: { 
      icon: Code2, 
      color: 'from-blue-600 to-indigo-600', 
      bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50', 
      border: isDarkMode ? 'border-blue-500/30' : 'border-blue-200' 
    },
    default: { 
      icon: FileText, 
      color: isDarkMode ? 'from-slate-500 to-slate-400' : 'from-gray-500 to-slate-500', 
      bg: isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50', 
      border: isDarkMode ? 'border-slate-500/30' : 'border-gray-200' 
    }
  }
}