import './App.css'
import { useTheme } from './context/ThemeContext'
import AppRouter from './router/AppRouter'



function App() {

  const{mode} = useTheme();

  return (
   <div className={mode==="dark"?"dark":"light"}>
   <AppRouter />
   </div>
   
  )
}

export default App
