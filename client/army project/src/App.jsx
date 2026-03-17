import { BrowserRouter, Route , Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import MoreInfo from './pages/MoreInfo'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './contaxt/ProtectedRoute'
import AdminProtectedRoute from './contaxt/AdminProtecdet'
import RegisterPage from './pages/RegisterPage'
import ProtectedRouteFromAir from './contaxt/ProtectedRouteFromAir'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element ={<LoginPage/>}/>
    <Route path='/api/launchers' element={<ProtectedRoute>
      <HomePage/>
    </ProtectedRoute>}/>
    <Route path='/api/launchers/add/launcher' element={<ProtectedRouteFromAir>
        <AddLauncherPage/>
      </ProtectedRouteFromAir>}/>
    <Route path='/auth/register/create' element={<AdminProtectedRoute>
        <RegisterPage/>
    </AdminProtectedRoute>}/>
    <Route path='/api/launchers/launcher/:id' element={<ProtectedRoute><MoreInfo/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App