import { BrowserRouter, Route , Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import MoreInfo from './pages/MoreInfo'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/add/launcher' element={<AddLauncherPage/>}/>
    <Route path='launcher/:id' element={<MoreInfo/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App