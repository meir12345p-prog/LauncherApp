import { BrowserRouter, Route , Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import MoreInfo from './pages/MoreInfo'
import LoginPage from './pages/LoginPage'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element ={<LoginPage/>}/>
    <Route path='/api/launchers' element={<HomePage/>}/>
    <Route path='/api/launchers/add/launcher' element={<AddLauncherPage/>}/>
    <Route path='/api/launchers/launcher/:id' element={<MoreInfo/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App