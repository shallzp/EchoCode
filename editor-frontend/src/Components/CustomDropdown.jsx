import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';

// import { getTheme } from '../theme/Theme'

const CustomDropdown = ({ theme, value, onChange, options, placeholder }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  // const theme = getTheme(isDarkMode);
  
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 ${theme.input} ${theme.text} border-2 rounded-lg focus:outline-none ${theme.inputFocus} transition-all duration-200 flex items-center justify-between`}>
        <span className={selectedOption ? theme.text : theme.textMuted}>
            {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 ${theme.textMuted} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 ${theme.dropdownBg} ${theme.border} border rounded-lg ${theme.shadowLg} z-50 max-h-48 overflow-y-auto`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left ${theme.text} ${theme.dropdownHover} transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomDropdown