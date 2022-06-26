import React, { useState, createContext, useContext} from 'react'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const colorsAdjustment = {
      textAndIconsColor: theme === 'light' ? '023047' : 'f1faee' ,
      sideBarAndHeaderColor: theme === 'light' ? 'edede9' : '0d1b2a',
      bodyColor: theme === 'light' ? 'edf2f4' : '354f52'
    }


    return (
      <ThemeContext.Provider value={{
          theme, setTheme,
          ...colorsAdjustment
      }}>
              {children}
      </ThemeContext.Provider>
    )
}


export const useThemeContext = () => useContext(ThemeContext)
export default ThemeContext