import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


    type ThemeContextType = {
        mode:"dark"|"light",
        toggleTheme:()=>void
    }

    const initState:ThemeContextType = {
        mode:"light",
        toggleTheme:()=>{}
    }
 export const ThemeContext = createContext<ThemeContextType>(initState)

export function ThemeProvider({children}:{children:React.ReactNode}){
    
    const [theme, setTheme] = useLocalStorage("theme",{mode:"light"})

    const toggleTheme = ()=>{

        setTheme((prev:{mode:"light"|"dark"}) => {
          
          return  {...prev,
                mode:prev.mode=="light"?"dark":"light"}
        })

    }

    return <ThemeContext.Provider value={{mode:theme.mode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
}

 export const useTheme = ()=>useContext(ThemeContext)

